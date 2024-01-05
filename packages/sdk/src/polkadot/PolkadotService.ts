import '@polkadot/api-augment';

import {
  ExtrinsicConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import {
  IConfigService,
  darwiniaPangoro,
  eq,
  equilibrium,
  equilibriumAlphanet,
  paring,
} from '@moonbeam-network/xcm-config';
import {
  AnyParachain,
  Asset,
  AssetAmount,
  ChainAssetId,
} from '@moonbeam-network/xcm-types';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import { ApiPromise } from '@polkadot/api';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import { Option, u128, u8 } from '@polkadot/types';
import { IKeyringPair } from '@polkadot/types/types';
import { AssetMetadata } from './PolkadotService.interfaces';

export class PolkadotService {
  readonly api: ApiPromise;

  readonly chain: AnyParachain;

  readonly configService: IConfigService;

  constructor(
    api: ApiPromise,
    chain: AnyParachain,
    configService: IConfigService,
  ) {
    this.api = api;
    this.chain = chain;
    this.configService = configService;
  }

  static async create(
    chain: AnyParachain,
    configService: IConfigService,
  ): Promise<PolkadotService> {
    return new PolkadotService(
      await getPolkadotApi(chain.ws),
      chain,
      configService,
    );
  }

  static async createMulti(
    chains: AnyParachain[],
    configService: IConfigService,
  ): Promise<PolkadotService[]> {
    return Promise.all(
      chains.map((chain: AnyParachain) =>
        PolkadotService.create(chain, configService),
      ),
    );
  }

  get decimals(): number {
    return this.api.registry.chainDecimals.at(0) || 12;
  }

  get asset(): Asset {
    const symbol = this.api.registry.chainTokens.at(0);
    const key = symbol?.toString().toLowerCase();

    // TODO: Remove this once Equilibrium is updated
    // or find better way if issue appears on other chains
    if (
      key === 'token' &&
      [equilibriumAlphanet.key, equilibrium.key].includes(this.chain.key)
    ) {
      return eq;
    }

    // TODO: Remove this once Darwinia Pangoro is updated
    if (key === 'oring' && this.chain.key === darwiniaPangoro.key) {
      return paring;
    }

    if (!key) {
      throw new Error('No native symbol key found');
    }

    const asset = this.configService.getAsset(key);

    if (!asset) {
      throw new Error(`No asset found for key "${key}" and symbol "${symbol}"`);
    }

    return asset;
  }

  get existentialDeposit(): AssetAmount {
    const existentialDeposit = this.api.consts.balances?.existentialDeposit;
    const eqExistentialDeposit = this.api.consts.eqBalances
      ?.existentialDeposit as unknown as u128 | undefined;
    const amount =
      existentialDeposit?.toBigInt() || eqExistentialDeposit?.toBigInt() || 0n;

    return AssetAmount.fromAsset(this.asset, {
      amount,
      decimals: this.decimals,
    });
  }

  async getAssetMeta(
    asset: ChainAssetId,
  ): Promise<{ symbol: string; decimals: number } | undefined> {
    const fn =
      this.api.query.assets?.metadata ||
      this.api.query.assetRegistry?.metadata ||
      this.api.query.assetRegistry?.currencyMetadatas ||
      this.api.query.assetRegistry?.assetMetadatas ||
      this.api.query.assetRegistry?.assetMetadataMap;

    if (!fn) {
      return undefined;
    }

    const data = (await fn(asset)) as AssetMetadata | Option<AssetMetadata>;
    const unwrapped = 'unwrapOrDefault' in data ? data.unwrapOrDefault() : data;

    return {
      decimals: unwrapped.decimals.toNumber(),
      symbol: unwrapped.symbol.toString(),
    };
  }

  async getAssetDecimalsFromQuery(
    asset: ChainAssetId,
  ): Promise<number | undefined> {
    const fn = this.api.query.assetsRegistry?.assetDecimals;

    if (!fn) {
      return undefined;
    }

    const data = (await fn(asset)) as Option<u8>;

    return data.unwrapOrDefault().toNumber();
  }

  async getAssetDecimals(asset: Asset): Promise<number> {
    const metaId = this.chain.getMetadataAssetId(asset);
    return (
      this.chain.getAssetDecimals(asset) ||
      (await this.getAssetDecimalsFromQuery(metaId)) ||
      (await this.getAssetMeta(metaId))?.decimals ||
      this.decimals
    );
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
