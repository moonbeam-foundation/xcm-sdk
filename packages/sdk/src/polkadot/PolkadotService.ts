import '@polkadot/api-augment';

import { QueryConfig } from '@moonbeam-network/xcm-builder';
import { assetsMap } from '@moonbeam-network/xcm-config';
import { Asset, AssetAmount } from '@moonbeam-network/xcm-types';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import { ApiPromise } from '@polkadot/api';
import { u128 } from '@polkadot/types';

export class PolkadotService {
  readonly #api: ApiPromise;

  constructor(api: ApiPromise) {
    this.#api = api;
  }

  static async create(ws: string): Promise<PolkadotService> {
    return new PolkadotService(await getPolkadotApi(ws));
  }

  static async createMulti(ws: string[]): Promise<PolkadotService[]> {
    return Promise.all(ws.map(PolkadotService.create));
  }

  get decimals(): number {
    return this.#api.registry.chainDecimals.at(0) || 12;
  }

  get asset(): Asset {
    const symbol = this.#api.registry.chainTokens
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
    const existentialDeposit = this.#api.consts.balances?.existentialDeposit;
    const eqExistentialDeposit = this.#api.consts.eqBalances
      ?.existentialDeposit as unknown as u128 | undefined;
    const amount =
      existentialDeposit?.toBigInt() || eqExistentialDeposit?.toBigInt() || 0n;

    return AssetAmount.fromAsset(this.asset, {
      amount,
      decimals: this.decimals,
    });
  }

  async query<Config extends QueryConfig>(config: Config): Promise<bigint> {
    const response = await this.#api.query[config.module][config.func](
      ...config.args,
    );

    if (response.isEmpty) {
      return 0n;
    }

    return config.transform(response);
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
