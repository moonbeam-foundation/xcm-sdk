import '@moonbeam-network/api-augment';

import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { AssetSymbol } from '../constants';
import { BalanceFunction, BalancePallet } from './balance.constants';
import {
  AssetsBalanceConfig,
  MinBalanceConfig,
  SystemBalanceConfig,
  TokensBalanceConfig,
  TokensPalletAccountData,
} from './balance.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function createBalanceBuilder<
  Symbols extends AssetSymbol = AssetSymbol,
>() {
  return {
    assets,
    min,
    system,
    tokens: (asset: number | bigint | Symbols | 'MOVR' | 'KUSD' | 'AUSD') =>
      tokens<Symbols>(asset),
  };
}

function assets(asset: number | bigint): AssetsBalanceConfig {
  return {
    pallet: BalancePallet.Assets,
    function: BalanceFunction.Account,
    path: ['balance'],
    getParams: (account: string) => [asset, account],
    calc: (balance: u128) => balance.toBigInt(),
  };
}

function min(asset: number): MinBalanceConfig {
  return {
    pallet: BalancePallet.Assets,
    function: BalanceFunction.Asset,
    path: ['minBalance'],
    params: [asset],
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

function tokens<Symbols extends AssetSymbol = AssetSymbol>(
  asset: number | bigint | Symbols | 'MOVR' | 'KUSD' | 'AUSD',
): TokensBalanceConfig<Symbols> {
  return {
    pallet: BalancePallet.Tokens,
    function: BalanceFunction.Accounts,
    path: [],
    getParams: (account: string) => [
      account,
      Number.isInteger(asset)
        ? { ForeignAsset: asset as number }
        : { Token: asset as Symbols },
    ],
    calc: ({ free, frozen }: TokensPalletAccountData) =>
      BigInt(free.sub(frozen).toString()),
  };
}
