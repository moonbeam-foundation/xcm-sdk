import '@moonbeam-network/api-augment';

import {
  Asset,
  AssetSymbol,
  BalanceConfig,
  ChainKey,
  ExtrinsicConfig,
  MinBalanceConfig,
  MoonChain,
  XcmConfigBuilder,
} from '@moonbeam-network/xcm-config';
import { ApiPromise } from '@polkadot/api';
import {
  QueryableStorageMultiArg,
  SubmittableExtrinsic,
  UnsubscribePromise,
} from '@polkadot/api/types';
import { Option } from '@polkadot/types';
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
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  readonly #api: ApiPromise;

  constructor(api: ApiPromise) {
    this.#api = api;
  }

  static async create<
    Symbols extends AssetSymbol = AssetSymbol,
    ChainKeys extends ChainKey = ChainKey,
  >(ws: string): Promise<PolkadotService<Symbols, ChainKeys>> {
    return new PolkadotService(await getPolkadotApi(ws));
  }

  static getChainMin(weight: number, unitsPerSecond: bigint): bigint {
    return calculateMin(weight, unitsPerSecond);
  }

  getMetadata() {
    return {
      decimals: this.#api.registry.chainDecimals.at(0) || 12,
      symbol: this.#api.registry.chainTokens.at(0) as Symbols,
    };
  }

  getExistentialDeposit(): bigint {
    return this.#api.consts.balances?.existentialDeposit.toBigInt() || 0n;
  }

  async getAssetDecimals(asset: Asset<Symbols>): Promise<number> {
    const meta = await this.getAssetMeta(asset);

    return meta.decimals.toNumber();
  }

  async getAssetMeta(
    asset: Asset<Symbols>,
  ): Promise<PalletAssetsAssetMetadata> {
    return (
      asset.isLocalAsset
        ? this.#api.query.localAssets.metadata
        : this.#api.query.assets.metadata
    )(asset.id);
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
    { pallet, function: fn, getParams, path, calc }: BalanceConfig<Symbols>,
  ): Promise<bigint> {
    const response = await this.#api.query[pallet][fn](...getParams(account));

    if (response.isEmpty) {
      return 0n;
    }

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
    { pallet, extrinsic, getParams }: ExtrinsicConfig<Symbols>,
    fee?: bigint,
    primaryAccount?: string,
  ): SubmittableExtrinsic<'promise'> {
    // eslint-disable-next-line no-console
    console.log(
      'getParams(account, amount, fee)',
      getParams(account, amount, fee),
    );
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

  async getAssetFee(
    asset: Asset,
    weight: number,
    moonChain: MoonChain,
  ): Promise<bigint> {
    let unitsPerSecond: bigint;

    if (asset.isNative) {
      unitsPerSecond = moonChain.unitsPerSecond;
    } else {
      const type = await this.getAssetType(asset.id);

      if (!type) {
        return 0n;
      }

      unitsPerSecond = (
        await this.#api.query.assetManager.assetTypeUnitsPerSecond(type)
      )
        .unwrapOrDefault()
        .toBigInt();
    }

    return calculateMin(weight, unitsPerSecond);
  }

  async getAssetType(
    id: string,
  ): Promise<MoonbeamRuntimeXcmConfigAssetType | undefined> {
    const type = await this.#api.query.assetManager.assetIdType(id);

    return type.unwrapOr(undefined);
  }

  async subscribeToAssetsBalanceInfo(
    account: string,
    config: XcmConfigBuilder<Symbols, ChainKeys>,
    callback: (data: AssetBalanceInfo<Symbols>[]) => void,
  ): UnsubscribePromise {
    const assetsArray = Object.values<Asset<Symbols>>(config.assets);
    const metadata = await this.getAssetsMetadata(assetsArray);

    return this.subscribeToAccountBalances(account, assetsArray, (data) => {
      callback(
        data.map((balance, index): AssetBalanceInfo<Symbols> => {
          const asset = assetsArray[index];
          const meta = metadata[index];
          const {
            chains: [chain],
            from,
          } = config.deposit(asset.originSymbol);
          const { origin } = from(chain.key);

          return {
            asset,
            balance: {
              balance: balance.balance.toBigInt(),
              decimals: asset.isNative
                ? (origin as MoonChain).decimals
                : meta.decimals.toNumber(),
              symbol: asset.isNative
                ? asset.originSymbol
                : meta.symbol.toHuman()?.toString() || '',
            },
            origin,
          };
        }),
      );
    });
  }

  async getAssetsMetadata(
    assetsArray: Asset<Symbols>[],
  ): Promise<PalletAssetsAssetMetadata[]> {
    const queries = assetsArray.map(
      (x) =>
        [
          x.isLocalAsset
            ? this.#api.query.localAssets.metadata
            : this.#api.query.assets.metadata,
          [x.id],
        ] as QueryableStorageMultiArg<'promise'>,
    );

    return this.#api.queryMulti(queries);
  }

  async subscribeToAccountBalances(
    account: string,
    assetsArray: Asset<Symbols>[],
    callback: (balances: PalletAssetsAssetAccount[]) => void,
  ): UnsubscribePromise {
    const queries = assetsArray.map(
      (x) =>
        [
          x.isLocalAsset
            ? this.#api.query.localAssets.account
            : this.#api.query.assets.account,
          [x.id, account],
        ] as QueryableStorageMultiArg<'promise'>,
    );

    return this.#api.queryMulti(
      queries,
      (res: Option<PalletAssetsAssetAccount>[]) => {
        const response = res.map((item) => item.unwrapOrDefault());

        callback(response);
      },
    );
  }
}
