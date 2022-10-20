import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { AssetSymbol } from '../constants';
import { BalanceFunction, BalancePallet } from './balance.constants';

export type BalanceConfig<Symbols extends AssetSymbol = AssetSymbol> =
  | SystemBalanceConfig
  | AssetsBalanceConfig
  | TokensBalanceConfig<Symbols>;

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

export interface TokensBalanceConfig<
  Symbols extends AssetSymbol = AssetSymbol,
> {
  pallet: BalancePallet.Tokens;
  function: BalanceFunction.Accounts;
  path: [];
  getParams: (account: string) => [string, TokensBalanceParam<Symbols>];
  calc: (data: TokensPalletAccountData) => bigint;
}

export type TokensBalanceParam<Symbols extends AssetSymbol = AssetSymbol> =
  | {
      Token: Symbols | 'MOVR' | 'KUSD';
    }
  | { ForeignAsset: number | bigint }
  | { MiningResource: number }
  | { FungibleToken: number };

export interface MinBalanceConfig {
  pallet: BalancePallet.Assets;
  function: BalanceFunction.Asset;
  path: ['minBalance'];
  params: [number];
}
