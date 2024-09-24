import {
  convertDecimals,
  toBigInt,
  toDecimal,
} from '@moonbeam-network/xcm-utils';
import Big, { type RoundingMode } from 'big.js';
import { ChainAsset, type ChainAssetConstructorParams } from './ChainAsset';

Big.NE = -18;

export interface AssetAmountConstructorParams
  extends ChainAssetConstructorParams {
  amount: number | bigint;
  decimals: number;
  symbol?: string;
}

export class AssetAmount extends ChainAsset {
  readonly amount: bigint;

  constructor({ amount, ...other }: AssetAmountConstructorParams) {
    super(other);

    this.amount = toBigInt(amount, other.decimals);
  }

  static fromChainAsset(
    asset: ChainAsset,
    params: Omit<
      AssetAmountConstructorParams,
      keyof ChainAssetConstructorParams
    >,
  ): AssetAmount {
    return new AssetAmount({
      ...asset,
      ...params,
    });
  }

  isSame(asset: ChainAsset | AssetAmount): boolean {
    return super.isEqual(asset) && this.decimals === asset.decimals;
  }

  isEqual(asset: AssetAmount): boolean {
    return this.isSame(asset) && this.amount === asset.amount;
  }

  copyWith(params: Partial<AssetAmountConstructorParams>): AssetAmount {
    return new AssetAmount({
      ...this,
      ...params,
    });
  }

  convertDecimals(decimals: number): AssetAmount {
    if (this.decimals === decimals) {
      return this.copyWith({});
    }

    return this.copyWith({
      amount: convertDecimals(this.amount, this.decimals, decimals),
      decimals,
    });
  }

  toBig(): Big {
    return Big(this.amount.toString());
  }

  toBigDecimal(maxDecimal?: number, roundType?: RoundingMode): Big {
    return Big(this.toDecimal(maxDecimal, roundType));
  }

  toDecimal(maxDecimal?: number, roundType?: RoundingMode): string {
    return toDecimal(this.amount, this.decimals, maxDecimal, roundType);
  }
}
