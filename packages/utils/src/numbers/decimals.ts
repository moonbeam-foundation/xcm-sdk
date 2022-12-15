import Big from 'big.js';

export function toDecimal(
  number: bigint | number | string,
  decimals: number,
  maxDecimal = 6,
): string {
  const dividend = Big(number.toString());
  const divisor = Big(10).pow(decimals);
  const result = dividend.div(divisor).round(maxDecimal);

  return result.toFixed();
}

export function toBigInt(amount: string, decimals: number): bigint {
  const bigNum = Big(amount).mul(10 ** decimals);

  return BigInt(bigNum.toFixed());
}
