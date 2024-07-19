import '@polkadot/api-augment';

import type {
  ExtrinsicConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import { type AnyParachain, AssetAmount } from '@moonbeam-network/xcm-types';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import type { u128 } from '@polkadot/types';
import type { IKeyringPair } from '@polkadot/types/types';

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

  async getFee(account: string, config: ExtrinsicConfig): Promise<bigint> {
    const fn = this.api.tx[config.module][config.func];
    const args = config.getArgs(fn);

    const extrinsic = fn(...args);
    const info = await extrinsic.paymentInfo(account, { nonce: -1 });

    return info.partialFee.toBigInt();
  }

  async transfer(
    account: string,
    config: ExtrinsicConfig,
    signer: PolkadotSigner | IKeyringPair,
  ): Promise<string> {
    const fn = this.api.tx[config.module][config.func];
    const args = config.getArgs(fn);

    const extrinsic = fn(...args);
    const hash = await extrinsic.signAndSend(
      this.#isSigner(signer) ? account : signer,
      {
        nonce: -1,
        signer: this.#isSigner(signer) ? signer : undefined,
      },
    );

    return hash.toString();
  }

  // eslint-disable-next-line class-methods-use-this
  #isSigner(signer: PolkadotSigner | IKeyringPair): signer is PolkadotSigner {
    return 'signPayload' in signer;
  }
}
