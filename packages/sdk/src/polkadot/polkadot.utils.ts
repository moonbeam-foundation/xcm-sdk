import { Asset } from '@moonbeam-network/xcm-config';
import { AssetBalanceInfo } from './polkadot.interfaces';

export function calculateMin(weight: number, unitsPerSecond: bigint): bigint {
  // 10**12 weight = 1 second
  return (BigInt(weight) * unitsPerSecond) / BigInt(10 ** 12);
}

export function sortByBalanceAndChainName<Assets extends Asset>(
  a: AssetBalanceInfo<Assets>,
  b: AssetBalanceInfo<Assets>,
) {
  const aBalance =
    a.balance.balance.toNumber() / 10 ** a.meta.decimals.toNumber();
  const bBalance =
    b.balance.balance.toNumber() / 10 ** b.meta.decimals.toNumber();

  if (aBalance || bBalance) {
    return bBalance - aBalance;
  }

  if (
    (a.origin.name + a.asset.originSymbol).toLowerCase() <
    (b.origin.name + b.asset.originSymbol).toLowerCase()
  ) {
    return -1;
  }

  if (
    (a.origin.name + a.asset.originSymbol).toLowerCase() >
    (b.origin.name + b.asset.originSymbol).toLowerCase()
  ) {
    return 1;
  }

  return 0;
}
