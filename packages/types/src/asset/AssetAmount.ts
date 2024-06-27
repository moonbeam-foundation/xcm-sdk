/* eslint-disable import/no-cycle */
import { toDecimal } from '@moonbeam-network/xcm-utils';
import Big, { RoundingMode } from 'big.js';
import { ChainAsset, ChainAssetConstructorParams } from './ChainAsset';

Big.NE = -18;

export interface AssetAmountConstructorParams
  extends ChainAssetConstructorParams {
  amount: bigint;
  decimals: number;
  symbol?: string;
}

export class AssetAmount extends ChainAsset {
  readonly amount: bigint;

  constructor({ amount, ...other }: AssetAmountConstructorParams) {
    super(other);

    this.amount = amount;
  }

  isSame(asset: AssetAmount): boolean {
    return super.isEqual(asset) && this.decimals === asset.decimals;
  }

  isEqual(asset: AssetAmount): boolean {
    return this.isSame(asset) && this.amount === asset.amount;
  }

  copyWith(params: Partial<AssetAmountConstructorParams>) {
    return new AssetAmount({
      ...this,
      ...params,
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
