import { AssetSymbol } from '@moonbeam-network/xcm-config';
import { AssetBalanceInfo } from '../polkadot';
import { XcmSdkDeposit, XcmSdkWithdraw } from './sdk.interfaces';

export function isXcmSdkDeposit(
  config: XcmSdkDeposit | XcmSdkWithdraw,
): config is XcmSdkDeposit {
  return !!(config as XcmSdkDeposit).from;
}

export function isXcmSdkWithdraw(
  config: XcmSdkDeposit | XcmSdkWithdraw,
): config is XcmSdkWithdraw {
  return !!(config as XcmSdkWithdraw).to;
}

export function sortByBalanceAndChainName<Symbols extends AssetSymbol>(
  a: AssetBalanceInfo<Symbols>,
  b: AssetBalanceInfo<Symbols>,
) {
  if (a.asset.isNative) {
    return -1;
  }

  if (b.asset.isNative) {
    return 1;
  }

  const aBalance =
    Number((a.balance * 1000000n) / 10n ** BigInt(a.meta.decimals)) / 1000000;
  const bBalance =
    Number((b.balance * 1000000n) / 10n ** BigInt(b.meta.decimals)) / 1000000;

  if (aBalance || bBalance) {
    return bBalance - aBalance;
  }

  const aName = (a.origin.name + a.asset.originSymbol).toLowerCase();
  const bName = (b.origin.name + b.asset.originSymbol).toLowerCase();

  if (aName < bName) {
    return -1;
  }

  if (aName > bName) {
    return 1;
  }

  return 0;
}
