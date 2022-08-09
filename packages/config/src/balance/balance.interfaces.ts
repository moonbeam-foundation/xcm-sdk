import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { Asset } from '../constants';
import { BalanceFunction, BalancePallet } from './balance.constants';

export type BalanceConfig<Assets extends Asset> =
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
  getParams: (account: string) => [number | bigint, string];
  calc: (balance: u128) => bigint;
}

export interface TokensPalletAccountData {
  free: u128;
  reserved: u128;
  frozen: u128;
}

export interface TokensBalanceConfig<Assets extends Asset> {
  pallet: BalancePallet.Tokens;
  function: BalanceFunction.Accounts;
  path: [];
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
  params: [number];
}
