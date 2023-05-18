import '@polkadot/api-augment';

import { ExtrinsicConfig, QueryConfig } from '@moonbeam-network/xcm-builder';
import { assetsMap } from '@moonbeam-network/xcm-config';
import { Asset, AssetAmount, ChainAssetId } from '@moonbeam-network/xcm-types';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import { ApiPromise } from '@polkadot/api';
import { u128 } from '@polkadot/types';
import { PalletAssetsAssetMetadata } from '@polkadot/types/lookup';

export class PolkadotService {
  readonly api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }

  static async create(ws: string): Promise<PolkadotService> {
    return new PolkadotService(await getPolkadotApi(ws));
  }

  static async createMulti(ws: string[]): Promise<PolkadotService[]> {
    return Promise.all(ws.map(PolkadotService.create));
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

  // async queryMulti<Config extends QueryConfig>(
  //   configs: Config[],
  // ): Promise<bigint[]> {
  //   const results = await this.#api.queryMulti(
  //     configs.map((config) => [
  //       this.#api.query[config.pallet][config.func],
  //       config.args,
  //     ]),
  //   );

  //   return results.map((result, index) =>
  //     result.isEmpty ? 0n : configs[index].transform(result),
  //   );
  // }
}
