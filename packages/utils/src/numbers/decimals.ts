import Big, { type RoundingMode } from 'big.js';

Big.NE = -18;

export function toDecimal(
  number: bigint | number | string,
  decimals: number,
  maxDecimal = 6,
  roundType?: RoundingMode,
): string {
  const dividend = Big(number.toString().replace(/[^0-9]/g, ''));
  const divisor = Big(10).pow(decimals);
  const result = dividend.div(divisor).round(maxDecimal, roundType);

  return result.toString();
}

export function toBigInt(
  amount: bigint | string | number,
  decimals: number,
): bigint {
  if (typeof amount === 'bigint') {
    return amount;
  }

  const multiplier = Big(10).pow(decimals);
  const result = Big(amount).mul(multiplier);

  return BigInt(result.toFixed(0, Big.roundDown));
}

export function convertDecimals(
  number: string | bigint,
  decimals: number,
  targetDecimals: number,
): bigint {
  const decimalNumber = toDecimal(number, decimals, decimals);

  return toBigInt(decimalNumber.toString(), targetDecimals);
}

export function hasDecimalOverflow(fl: number | string, maxDecimal: number) {
  const parts = fl.toString().split('.');
  return parts.length > 1 && parts[1].length > maxDecimal;
}
