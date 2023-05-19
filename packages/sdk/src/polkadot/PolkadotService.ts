import '@polkadot/api-augment';

import { ExtrinsicConfig, QueryConfig } from '@moonbeam-network/xcm-builder';
import { assetsMap } from '@moonbeam-network/xcm-config';
import {
  Asset,
  AssetAmount,
  ChainAssetId,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import { ApiPromise } from '@polkadot/api';
import { u128 } from '@polkadot/types';
import { PalletAssetsAssetMetadata } from '@polkadot/types/lookup';

export type AnyParachain = Parachain | EvmParachain;

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
    return Promise.all(chains.map(PolkadotService.create));
  }

  get decimals(): number {
    return this.api.registry.chainDecimals.at(0) || 12;
  }

  get asset(): Asset {
    const symbol = this.api.registry.chainTokens
      .at(0)
      ?.toString()
      .toLowerCase();

    if (!symbol) {
      throw new Error('No native symbol found');
    }

    const asset = assetsMap.get(symbol);

    if (!asset) {
      throw new Error(`No asset found for symbol ${symbol}`);
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
    // TODO: Is it the same as asset min builder?
    const fn =
      this.api.query.assets?.metadata ||
      this.api.query.assetRegistry?.currencyMetadatas ||
      this.api.query.assetRegistry?.assetMetadatas;

    if (!fn) {
      return undefined;
    }

    const data = (await fn(asset)) as PalletAssetsAssetMetadata;

    return {
      decimals: data.decimals.toNumber(),
      symbol: data.symbol.toString(),
    };
  }

  async getAssetDecimals(asset: Asset): Promise<number> {
    return (
      (await this.getAssetMeta(this.chain.getAssetId(asset)))?.decimals ||
      this.chain.getAssetDecimals(asset) ||
      this.decimals
    );
  }

  async query(config: QueryConfig): Promise<bigint> {
    const response = await this.api.query[config.module][config.func](
      ...config.args,
    );

    if (response.isEmpty) {
      return 0n;
    }

    return config.transform(response);
  }

  async getFee(account: string, config: ExtrinsicConfig): Promise<bigint> {
    const fn = this.api.tx[config.module][config.func];
    const extrinsic = fn(...config.getArgs(fn));
    const info = await extrinsic.paymentInfo(account, { nonce: -1 });

    return info.partialFee.toBigInt();
  }
}
