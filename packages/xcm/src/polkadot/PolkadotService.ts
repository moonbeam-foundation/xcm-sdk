import '@moonbeam-network/api-augment';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Asset, BalanceConfig } from '@moonbeam-network/xcm-config';
import { ApiPromise } from '@polkadot/api';
import { PalletAssetsAssetMetadata } from '@polkadot/types/lookup';
import { get } from 'lodash';
import { getPolkadotApi } from './polkadot.api';

export class PolkadotService {
  readonly #api: ApiPromise;

  constructor(api: ApiPromise) {
    this.#api = api;

    this.getGenericBalance.bind(this);
  }

  static async create(ws: string): Promise<PolkadotService> {
    return new PolkadotService(await getPolkadotApi(ws));
  }

  getMetadata() {
    return {
      decimals: this.#api.registry.chainDecimals.at(0) || 12,
      symbol: this.#api.registry.chainTokens.at(0) || 'unknown',
    };
  }

  async getAssetDecimals(assetId: string): Promise<number> {
    const meta = await this.getAssetMeta(assetId);

    return meta.decimals.toNumber();
  }

  async getAssetMeta(assetId: string): Promise<PalletAssetsAssetMetadata> {
    // TODO: how to fix any?
    return this.#api.query.assets.metadata(assetId) as any;
  }

  getExistentialDeposit(): bigint {
    return this.#api.consts.balances?.existentialDeposit.toBigInt() || 0n;
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
