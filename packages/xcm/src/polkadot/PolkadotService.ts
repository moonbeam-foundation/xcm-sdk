import '@moonbeam-network/api-augment';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Asset,
  BalanceConfig,
  MinBalanceConfig,
} from '@moonbeam-network/xcm-config';
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

  getExistentialDeposit(): bigint {
    return this.#api.consts.balances?.existentialDeposit.toBigInt() || 0n;
  }

  async getAssetDecimals(assetId: string): Promise<number> {
    const meta = await this.getAssetMeta(assetId);

    return meta.decimals.toNumber();
  }

  async getAssetMeta(assetId: string): Promise<PalletAssetsAssetMetadata> {
    // TODO: how to fix any?
    return this.#api.query.assets.metadata(assetId) as any;
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

  async getAssetMinBalance({
    pallet,
    function: fn,
    params,
    path,
  }: MinBalanceConfig): Promise<bigint> {
    const details = await this.#api.query[pallet][fn](...params);

    if (details.isEmpty) {
      return 0n;
    }

    return get(details, path).toBigInt();
  }

  getXcmExtrinsic(
    extrinsicConfig: any,
    plankAmount: bigint,
    account: string,
    primaryAccount: string,
    isProxy: boolean,
    weight: number,
    xcmFee?: bigint,
  ): SubmittableExtrinsic<'promise'> {
    let rawParams = JSON.stringify(extrinsicConfig.params)
      .replace('%plankAmount%', plankAmount.toString())
      .replace('%account%', account)
      .replace('%weight%', weight.toString());
    if (xcmFee)
      rawParams = rawParams.replace('%xcmFeePlankAmount%', xcmFee.toString());

    const params = JSON.parse(rawParams);

    let transferExtrinsic = this.api.tx[extrinsicConfig.pallet][
      extrinsicConfig.extrinsic
    ](...params);

    if (isProxy) {
      // TODO Check if it's a valid proxy account
      transferExtrinsic = this.api.tx.proxy.proxy(
        primaryAccount,
        null,
        transferExtrinsic,
      );
    }

    return transferExtrinsic;
  }
}
