import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { BalanceFunction, BalancePallet } from './balance.constants';

export type BalanceConfig<Assets> =
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

export interface TokensPalletAccountData {
  free: u128;
  reserved: u128;
  frozen: u128;
}

export interface TokensBalanceConfig<Assets> {
  pallet: BalancePallet.Tokens;
  function: BalanceFunction.Accounts;
  getParams: (account: string) => [
    string,
    (
      | {
          Token: Assets | 'MOVR' | 'KUSD';
        }
      | { ForeignAsset: number }
    ),
  ];
  calc: (data: TokensPalletAccountData) => bigint;
}

export interface MinBalanceConfig {
  pallet: BalancePallet.Assets;
  function: BalanceFunction.Asset;
  path: ['minBalance'];
  getParams: () => [number];
}
