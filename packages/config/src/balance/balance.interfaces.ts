import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { BalanceFunction, BalancePallet } from './balance.constants';

export type BalanceConfig<Assets extends string> =
  | SystemBalanceConfig
  | AssetsBalanceConfig
  | TokensBalanceConfig<Assets>;

export interface SystemBalanceConfig {
  pallet: BalancePallet.System;
  function: BalanceFunction.Account;
  path: ['data'];
  getParams: (account: string) => [string];
  calc: (data: PalletBalancesAccountData) => bigint;
}

export interface AssetsBalanceConfig {
  pallet: BalancePallet.Assets;
  function: BalanceFunction.Account;
  path: ['balance'];
  getParams: (account: string) => [number, string];
}

export interface TokensBalanceConfig<Assets> {
  pallet: BalancePallet.Tokens;
  function: BalanceFunction.Accounts;
  path: ['free'];
  getParams: (account: string) => [
    string,
    (
      | {
          Token: Assets | 'MOVR' | 'KUSD';
        }
      | { ForeignAsset: number }
    ),
  ];
}

export interface AssetMinBalanceConfig {
  pallet: BalancePallet.Assets;
  function: BalanceFunction.Asset;
  path: ['minBalance'];
  getParams: () => [number];
}
