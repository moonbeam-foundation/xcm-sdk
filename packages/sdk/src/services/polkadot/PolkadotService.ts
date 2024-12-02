import '@polkadot/api-augment';

import type {
  ExtrinsicConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import { type AnyParachain, AssetAmount } from '@moonbeam-network/xcm-types';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type {
  Signer as PolkadotSigner,
  SubmittableExtrinsic,
} from '@polkadot/api/types';
import type { u128 } from '@polkadot/types';
import type { RuntimeDispatchInfo } from '@polkadot/types/interfaces';
import type { IKeyringPair, ISubmittableResult } from '@polkadot/types/types';
import type { HexString } from '@polkadot/util/types';

export class PolkadotService {
  readonly api: ApiPromise;

  readonly chain: AnyParachain;

  constructor(api: ApiPromise, chain: AnyParachain) {
    this.api = api;
    this.chain = chain;
  }

  static async create(chain: AnyParachain): Promise<PolkadotService> {
    return new PolkadotService(await getPolkadotApi(chain.ws), chain);
  }

  static async createMulti(chains: AnyParachain[]): Promise<PolkadotService[]> {
    return Promise.all(
      chains.map((chain: AnyParachain) => PolkadotService.create(chain)),
    );
  }

  get decimals(): number {
    return this.api.registry.chainDecimals.at(0) || 12;
  }

  get existentialDeposit(): AssetAmount {
    const existentialDeposit = this.api.consts.balances?.existentialDeposit;
    const eqExistentialDeposit = this.api.consts.eqBalances
      ?.existentialDeposit as unknown as u128 | undefined;
    const amount =
      existentialDeposit?.toBigInt() || eqExistentialDeposit?.toBigInt() || 0n;

    return AssetAmount.fromChainAsset(this.chain.nativeAsset, { amount });
  }

  async query(config: SubstrateQueryConfig): Promise<bigint> {
    const response = await this.api.query[config.module][config.func](
      ...config.args,
    );

    return config.transform(response);
  }

  getExtrinsic(
    config: ExtrinsicConfig,
  ): SubmittableExtrinsic<'promise', ISubmittableResult> {
    const fn = this.api.tx[config.module][config.func];
    const args = config.getArgs(fn);

    return fn(...args);
  }

  getExtrinsicCallHash(config: ExtrinsicConfig): HexString {
    return this.getExtrinsic(config).method.toHex();
  }

  async getPaymentInfo(
    account: string,
    config: ExtrinsicConfig,
  ): Promise<RuntimeDispatchInfo> {
    const extrinsic = this.getExtrinsic(config);

    return extrinsic.paymentInfo(account, { nonce: -1 });
  }

  async getFee(account: string, config: ExtrinsicConfig): Promise<bigint> {
    const info = await this.getPaymentInfo(account, config);

    return info.partialFee.toBigInt();
  }

  async transfer(
    account: string,
    config: ExtrinsicConfig,
    signer: PolkadotSigner | IKeyringPair,
    statusCallback?: (params: ISubmittableResult) => void,
  ): Promise<string> {
    const extrinsic = this.getExtrinsic(config);

    const isSigner = this.#isSigner(signer);
    const signOptions = {
      nonce: -1,
      signer: isSigner ? signer : undefined,
      withSignedTransaction: true,
    };

    const hash = await new Promise<string>((resolve, reject) => {
      extrinsic
        .signAndSend(isSigner ? account : signer, signOptions, (result) => {
          if (result.isError || result.dispatchError) {
            reject(
              new Error(
                result.dispatchError?.toString() || 'Transaction failed',
              ),
            );
          }
          if (result.txHash) {
            resolve(result.txHash.toString());
          }
          statusCallback?.(result);
        })
        .catch(reject);
    });

    return hash;
  }

  #isSigner(signer: PolkadotSigner | IKeyringPair): signer is PolkadotSigner {
    return 'signPayload' in signer;
  }
}
