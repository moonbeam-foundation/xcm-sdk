// eslint-disable-next-line import/no-extraneous-dependencies
import { Asset } from '@moonbeam-network/xcm-config';
import { BN } from '@polkadot/util';
import { AssetBalanceInfo } from './polkadot.interfaces';

export function calculateMin(weight: number, unitsPerSecond: bigint): bigint {
  // 10**12 weight = 1 second
  return (BigInt(weight) * unitsPerSecond) / BigInt(10 ** 12);
}

export function sortByBalanceAndChainName<Assets extends Asset>(
  a: AssetBalanceInfo<Assets>,
  b: AssetBalanceInfo<Assets>,
) {
  const aBalance = new BN(a.balance.balance.toString()).div(
    new BN(10 ** a.meta.decimals.toNumber()),
  );
  const bBalance = new BN(b.balance.balance.toString()).div(
    new BN(10 ** b.meta.decimals.toNumber()),
  );

  if (bBalance.sub(aBalance).toNumber()) {
    return bBalance.sub(aBalance).toNumber();
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
