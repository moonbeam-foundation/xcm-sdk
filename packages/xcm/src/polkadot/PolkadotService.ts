// eslint-disable-next-line import/no-extraneous-dependencies
import { Asset, BalanceConfig } from '@moonbeam-network/xcm-config';
import { ApiPromise } from '@polkadot/api';
import { get } from 'lodash';
import { getPolkadotApi } from './polkadot.api';

export class PolkadotService {
  readonly #api: ApiPromise;

  constructor(api: ApiPromise) {
    this.#api = api;
  }

  static async create(ws: string): Promise<PolkadotService> {
    return new PolkadotService(await getPolkadotApi(ws));
  }

  async getGenericBalance<Assets extends Asset>(
    account: string,
    { pallet, function: fn, getParams, path, calc }: BalanceConfig<Assets>,
  ): Promise<bigint> {
    const response = await this.#api.query[pallet][fn](...getParams(account));

    if (response.isEmpty) {
      return 0n;
    }

    // TODO: improve types here and in balance interfaces
    const unwrapped = (response as any).unwrap?.() || response;

    return calc(path.length ? get(unwrapped, path) : unwrapped);
  }
}
