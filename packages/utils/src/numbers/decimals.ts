import Big from 'big.js';

export function toDecimal(
  number: bigint | number | string,
  decimals: number,
  maxDecimal = 6,
): number {
  const dividend = Big(number.toString().replace(/[^0-9]/g, ''));
  const divisor = Big(10).pow(decimals);
  const result = dividend.div(divisor).round(maxDecimal);

  return result.toNumber();
}

export function toBigInt(amount: string, decimals: number): bigint {
  const multiplier = Big(10).pow(decimals);
  const result = Big(amount).mul(multiplier);

  return BigInt(result.toFixed());
}
