import { Asset, AssetConstructorParams } from './Asset';

export interface AssetAmountProps {
  amount: string | number | bigint;
  decimals: number;
  symbol?: string;
}

export interface AssetAmountConstructorProps
  extends AssetConstructorParams,
    AssetAmountProps {}

export class AssetAmount extends Asset {
  amount: bigint;

  decimals: number;

  symbol: string;

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

  // toDecimal(): string;
}
