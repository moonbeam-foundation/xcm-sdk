/* eslint-disable import/no-cycle */
import { toBigInt } from '@moonbeam-network/xcm-utils';
import { Asset, AssetConstructorParams } from './Asset';
import { AssetAmount, AssetAmountConstructorParams } from './AssetAmount';

export interface ChainAssetConstructorParams extends AssetConstructorParams {
  address?: string;
  decimals: number;
  ids?: ChainAssetIds;
  min?: number | bigint;
  symbol?: string;
}

export interface ChainAssetIds {
  balanceId?: ChainAssetId;
  id?: ChainAssetId;
  minId?: ChainAssetId;
  palletInstance?: number;
}

export type ChainAssetId =
  | string
  | number
  | bigint
  | { [key: string]: ChainAssetId };

export class ChainAsset extends Asset {
  readonly address?: string;

  readonly decimals: number;

  readonly ids?: ChainAssetIds;

  readonly min?: bigint;

  readonly symbol?: string;

  constructor({
    address,
    decimals,
    ids,
    min,
    symbol,
    ...other
  }: ChainAssetConstructorParams) {
    super(other);

    this.address = address;
    this.decimals = decimals;
    this.ids = ids;
    this.min = min ? toBigInt(min, decimals) : undefined;
    this.symbol = symbol;
  }

  toAssetAmount(
    params: Omit<
      AssetAmountConstructorParams,
      keyof ChainAssetConstructorParams
    >,
  ): AssetAmount {
    return new AssetAmount({
      address: this.address,
      decimals: this.decimals,
      ids: this.ids,
      key: this.key,
      min: this.min,
      originSymbol: this.originSymbol,
      symbol: this.symbol,
      ...params,
    });
  }

  getAssetId(): ChainAssetId {
    return this.ids?.id ?? this.originSymbol;
  }

  getBalanceAssetId(): ChainAssetId {
    return this.ids?.balanceId ?? this.getAssetId();
  }

  getMinAssetId(): ChainAssetId {
    return this.ids?.minId ?? this.getAssetId();
  }

  getAssetPalletInstance(): number | undefined {
    return this.ids?.palletInstance;
  }

  getAssetMin(): bigint {
    return this.min ?? 0n;
  }
}
