export function calculateMin(weight: number, unitsPerSecond: bigint): bigint {
  // 10**12 weight = 1 second
  return (BigInt(weight) * unitsPerSecond) / BigInt(10 ** 12);
}
