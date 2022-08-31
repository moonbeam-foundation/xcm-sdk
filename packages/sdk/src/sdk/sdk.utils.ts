import {
  AssetSymbol,
  ChainKey,
  XcmConfigBuilder,
} from '@moonbeam-network/xcm-config';
import { UnsubscribePromise } from '@polkadot/api/types';
import { AssetBalanceInfo, PolkadotService } from '../polkadot';
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

export interface SubscribeToAssetsBalanceInfoParams<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  account: string;
  polkadot: PolkadotService<Symbols, ChainKeys>;
  configBuilder: XcmConfigBuilder<Symbols, ChainKeys>;
  cb: (data: AssetBalanceInfo<Symbols>[]) => void;
}

export async function subscribeToAssetsBalanceInfo<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>({
  account,
  polkadot,
  configBuilder,
  cb,
}: SubscribeToAssetsBalanceInfoParams<Symbols, ChainKeys>): UnsubscribePromise {
  let lastBalance = 0n;
  let lastInfo: AssetBalanceInfo<Symbols>[] = [];
  const handler = (data: bigint | AssetBalanceInfo<Symbols>[]) => {
    const isBalance = typeof data === 'bigint';

    lastBalance = isBalance ? data : lastBalance;
    lastInfo = (isBalance ? lastInfo : data)
      .map((info) => {
        if (info.asset.isNative) {
          // eslint-disable-next-line no-param-reassign
          info.balance = lastBalance;
        }

        return info;
      })
      .sort(sortByBalanceAndChainName);

    cb(lastInfo);
  };

  const unsubscribeBalance = await polkadot.subscribeToBalance(
    account,
    handler,
  );
  const unsubscribeInfo = await polkadot.subscribeToAssetsBalanceInfo(
    account,
    configBuilder,
    handler,
  );

  return () => {
    unsubscribeBalance();
    unsubscribeInfo();
  };
}
