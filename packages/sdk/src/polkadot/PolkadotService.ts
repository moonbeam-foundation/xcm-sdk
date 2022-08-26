import '@moonbeam-network/api-augment';

import {
  Asset,
  AssetConfig,
  BalanceConfig,
  Chain,
  ConfigGetter,
  ExtrinsicConfig,
  MinBalanceConfig,
  MoonChainConfig,
} from '@moonbeam-network/xcm-config';
import { ApiPromise } from '@polkadot/api';
import { SubmittableExtrinsic, UnsubscribePromise } from '@polkadot/api/types';
import { AccountInfo } from '@polkadot/types/interfaces';
import {
  MoonbeamRuntimeXcmConfigAssetType,
  PalletAssetsAssetAccount,
  PalletAssetsAssetMetadata,
} from '@polkadot/types/lookup';
import { get } from 'lodash';
import { getPolkadotApi } from './polkadot.api';
import { AssetBalanceInfo } from './polkadot.interfaces';
import { calculateMin } from './polkadot.utils';

export class PolkadotService<
  Assets extends Asset = Asset,
  Chains extends Chain = Chain,
> {
  readonly #api: ApiPromise;

  constructor(api: ApiPromise) {
    this.#api = api;
  }

  static async create<
    Assets extends Asset = Asset,
    Chains extends Chain = Chain,
  >(ws: string): Promise<PolkadotService<Assets, Chains>> {
    return new PolkadotService(await getPolkadotApi(ws));
  }

  static getChainMin(weight: number, unitsPerSecond: bigint): bigint {
    return calculateMin(weight, unitsPerSecond);
  }

  getMetadata() {
    return {
      decimals: this.#api.registry.chainDecimals.at(0) || 12,
      symbol: this.#api.registry.chainTokens.at(0) as Assets,
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

  async subscribeToAccountInfo(
    account: string,
    callback: (info: AccountInfo) => void,
  ): UnsubscribePromise {
    return this.#api.query.system.account<AccountInfo>(account, callback);
  }

  async subscribeToBalance(
    account: string,
    callback: (balance: bigint) => void,
  ): UnsubscribePromise {
    return this.subscribeToAccountInfo(account, ({ data }) =>
      callback(data.free.toBigInt() - data.miscFrozen.toBigInt()),
    );
  }

  async getGenericBalance(
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

    return get(details.value, path).toBigInt();
  }

  getXcmExtrinsic(
    account: string,
    amount: bigint,
    { pallet, extrinsic, getParams }: ExtrinsicConfig<Assets>,
    fee?: bigint,
    primaryAccount?: string,
  ): SubmittableExtrinsic<'promise'> {
    let transferExtrinsic = this.#api.tx[pallet][extrinsic](
      // TODO: check issue with types and if we can fix it
      // @ts-ignore
      ...getParams(account, amount, fee),
    );

    if (primaryAccount) {
      transferExtrinsic = this.#api.tx.proxy.proxy(
        primaryAccount,
        null,
        transferExtrinsic,
      );
    }

    return transferExtrinsic;
  }

  async getAssetFee(id: string, weight: number): Promise<bigint> {
    const type = await this.getAssetType(id);

    if (!type) {
      return 0n;
    }

    const unitsPerSecond =
      await this.#api.query.assetManager.assetTypeUnitsPerSecond(type);

    return calculateMin(weight, unitsPerSecond.unwrapOrDefault().toBigInt());
  }

  async getAssetType(
    id: string,
  ): Promise<MoonbeamRuntimeXcmConfigAssetType | undefined> {
    const type = await this.#api.query.assetManager.assetIdType(id);

    return type.unwrapOr(undefined);
  }

  async subscribeToAssetsBalanceInfo(
    account: string,
    configGetter: ConfigGetter<Assets, Chains>,
    callback: (data: AssetBalanceInfo<Assets>[]) => void,
  ): UnsubscribePromise {
    const assetsArray = Object.values<AssetConfig<Assets>>(configGetter.assets);
    const ids: string[] = assetsArray.map((asset) => asset.id);
    const metadata: PalletAssetsAssetMetadata[] =
      (await this.#api.query.assets.metadata.multi(ids)) as any;

    return this.subscribeToAccountBalances(account, ids, (data) => {
      callback(
        data.map((balance, index): AssetBalanceInfo<Assets> => {
          const asset = assetsArray[index];
          const meta = metadata[index];
          const {
            chains: [chain],
            from,
          } = configGetter.deposit(asset.originSymbol);
          // TODO: remove as
          const { origin } = from(chain.chain as Chains);

          return {
            asset,
            balance: balance.balance.toBigInt(),
            meta: {
              decimals: asset.isNative
                ? (origin as MoonChainConfig).decimals
                : meta.decimals.toNumber(),
              symbol: asset.isNative
                ? asset.originSymbol
                : meta.symbol.toHuman()?.toString() || '',
              originSymbol: asset.isNative
                ? asset.originSymbol
                : (meta.name.toHuman()?.toString() as Assets),
            },
            origin,
          };
        }),
      );
    });
  }

  async subscribeToAccountBalances(
    account: string,
    ids: string[],
    callback: (balances: PalletAssetsAssetAccount[]) => void,
  ): UnsubscribePromise {
    const keys = ids.map((x) => [x, account]);

    return this.#api.query.assets.account.multi(keys, (res) => {
      const response = res.map((balance) => balance.unwrapOrDefault());

      callback(response);
    });
  }
}
