import { toDecimal } from '@moonbeam-network/xcm-utils';
import Big, { RoundingMode } from 'big.js';
import { Asset, AssetConstructorParams } from './Asset';

export interface AssetAmountProps {
  amount: bigint;
  decimals: number;
  symbol?: string;
}

export interface AssetAmountConstructorProps
  extends AssetConstructorParams,
    AssetAmountProps {}

export class AssetAmount extends Asset {
  readonly amount: bigint;

  readonly decimals: number;

  readonly symbol: string;

  constructor({
    amount,
    decimals,
    symbol,
    ...other
  }: AssetAmountConstructorProps) {
    super(other);

    this.amount = BigInt(amount);
    this.decimals = decimals;
    this.symbol = symbol || this.originSymbol;
  }

  static fromAsset(asset: Asset, props: AssetAmountProps) {
    return new AssetAmount({
      ...asset,
      ...props,
    });
  }

  isSame(asset: AssetAmount): boolean {
    return super.isEqual(asset) && this.decimals === asset.decimals;
  }

  isEqual(asset: AssetAmount): boolean {
    return this.isSame(asset) && this.amount === asset.amount;
  }

  copyWith(props: Partial<AssetAmountConstructorProps>) {
    return new AssetAmount({
      ...this,
      ...props,
    });
  }

  toBig(): Big {
    return Big(this.amount.toString());
  }

  toDecimal(maxDecimal?: number, roundType?: RoundingMode): string {
    return toDecimal(this.amount, this.decimals, maxDecimal, roundType);
  }
}
