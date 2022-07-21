import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { BalanceFunction, BalancePallet } from './balance.constants';
import {
  AssetMinBalanceConfig,
  AssetsBalanceConfig,
  SystemBalanceConfig,
  TokensBalanceConfig,
} from './balance.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function createBalanceBuilder<Asset>() {
  return {
    assets,
    min,
    system,
    tokens: (asset: number | Asset | 'MOVR' | 'KUSD' | 'AUSD') =>
      tokens<Asset>(asset),
  };
}

function assets(asset: number): AssetsBalanceConfig {
  return {
    pallet: BalancePallet.Assets,
    function: BalanceFunction.Account,
    path: ['balance'],
    getParams: (account: string) => [asset, account],
  };
}

function min(asset: number): AssetMinBalanceConfig {
  return {
    pallet: BalancePallet.Assets,
    function: BalanceFunction.Asset,
    path: ['minBalance'],
    getParams: () => [asset],
  };
}

function system(): SystemBalanceConfig {
  return {
    pallet: BalancePallet.System,
    function: BalanceFunction.Account,
    path: ['data'],
    getParams: (account: string) => [account],
    calc: ({ free, miscFrozen }: PalletBalancesAccountData) =>
      BigInt(free.sub(miscFrozen).toString()),
  };
}

function tokens<Asset>(
  asset: number | Asset | 'MOVR' | 'KUSD' | 'AUSD',
): TokensBalanceConfig<Asset> {
  return {
    pallet: BalancePallet.Tokens,
    function: BalanceFunction.Accounts,
    path: ['free'],
    getParams: (account: string) => [
      account,
      Number.isInteger(asset)
        ? { ForeignAsset: asset as number }
        : { Token: asset as Asset },
    ],
  };
}
