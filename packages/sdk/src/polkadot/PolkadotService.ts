import '@polkadot/api-augment';

import { QueryConfig } from '@moonbeam-network/xcm-builder';
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

  get existentialDeposit(): bigint {
    const existentialDeposit = this.#api.consts.balances?.existentialDeposit;
    const eqExistentialDeposit = this.#api.consts.eqBalances
      ?.existentialDeposit as unknown as u128 | undefined;

    return (
      existentialDeposit?.toBigInt() || eqExistentialDeposit?.toBigInt() || 0n
    );
  }

  async query<Config extends QueryConfig>(config: Config): Promise<bigint> {
    const response = await this.#api.query[config.pallet][config.func](
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
