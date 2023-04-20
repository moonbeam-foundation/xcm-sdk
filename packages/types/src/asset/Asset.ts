export interface AssetConstructorParams {
  amount: string | number;
  decimals?: number;
  id?: string;
  originSymbol?: string;
  symbol: string;
}

export class Asset {
  amount: bigint;

  decimals?: number;

  id?: string;

  originSymbol: string;

  symbol: string;

  constructor({
    amount,
    decimals,
    originSymbol,
    symbol,
  }: AssetConstructorParams) {
    this.amount = BigInt(amount);
    this.decimals = decimals;
    this.originSymbol = originSymbol || symbol;
    this.symbol = symbol;
  }

  // toBigInt(): bigint;
  // toDecimal(): string;
}
