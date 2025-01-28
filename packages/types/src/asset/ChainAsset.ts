import { toBigInt } from '@moonbeam-network/xcm-utils';
import { Asset, type AssetConstructorParams } from './Asset';

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

  static fromAsset(
    asset: Asset,
    params: Omit<ChainAssetConstructorParams, keyof AssetConstructorParams>,
  ): ChainAsset {
    return new ChainAsset({
      ...asset,
      ...params,
    });
  }

  copyWith(params: Partial<ChainAssetConstructorParams>): ChainAsset {
    return new ChainAsset({
      ...this,
      ...params,
    });
  }

  getSymbol(): string {
    return this.symbol || this.originSymbol;
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

  hasOnlyAddress(): this is { address: string } {
    return !!this.address && !this.ids?.id;
  }
}
