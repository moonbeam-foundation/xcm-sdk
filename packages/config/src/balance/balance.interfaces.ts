import { Struct, Type, u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { AssetSymbol } from '../constants';
import { AssetId } from '../interfaces';
import {
  BalanceCurrencyTypes,
  BalanceFunction,
  BalancePallet,
} from './balance.constants';

export type BalanceConfig<Symbols extends AssetSymbol = AssetSymbol> =
  | SystemBalanceConfig
  | AssetsBalanceConfig
  | EquilibriumSystemBalanceConfig
  | OrmlTokensBalanceConfig
  | TokensBalanceConfig<Symbols>;

export interface SystemBalanceConfig<Data = PalletBalancesAccountData> {
  pallet: BalancePallet.System;
  function: BalanceFunction.Account;
  path: ['data'];
  getParams: (account: string) => [string];
  calc: (data: Data) => bigint;
}

export type EquilibriumSystemBalanceConfig = SystemBalanceConfig<Type>;
export type EquilibriumSystemBalanceData = Array<
  [number, { positive: number }]
>;

export interface AssetsBalanceConfig {
  pallet: BalancePallet.Assets;
  function: BalanceFunction.Account;
  path: ['balance'];
  getParams: (account: string) => [AssetId, string];
  calc: (balance: u128) => bigint;
}

export interface TokensPalletAccountData {
  free: u128;
  reserved: u128;
  frozen: u128;
}

export interface OrmlTokensBalanceConfig {
  pallet: BalancePallet.OrmlTokens;
  function: BalanceFunction.Accounts;
  path: [];
  getParams: (account: string) => [string, { ForeignAsset: AssetId }];
  calc: (data: TokensPalletAccountData) => bigint;
}

export interface TokensBalanceConfig<
  Symbols extends AssetSymbol = AssetSymbol,
> {
  pallet: BalancePallet.Tokens;
  function: BalanceFunction.Accounts;
  path: [];
  getParams: (account: string) => [string, TokensBalanceParamAsset<Symbols>];
  calc: (data: TokensPalletAccountData) => bigint;
}

export type TokensBalanceParamAsset<Symbols extends AssetSymbol = AssetSymbol> =

    | {
        [BalanceCurrencyTypes.Token]: Symbols | AssetSymbol.KUSD;
      }
    | { [BalanceCurrencyTypes.ForeignAsset]: AssetId }
    | { [BalanceCurrencyTypes.MiningResource]: AssetId }
    | { [BalanceCurrencyTypes.FungibleToken]: AssetId }
    | { [BalanceCurrencyTypes.Token2]: AssetId }
    | number
    | bigint;

export type MinBalanceConfig =
  | MinBalanceAssetsConfig
  | MinBalanceAssetRegistryConfig;

export interface MinBalanceAssetsConfig {
  pallet: BalancePallet.Assets;
  function: BalanceFunction.Asset;
  path: ['minBalance'];
  params: [AssetId];
}

export interface MinBalanceAssetRegistryConfig {
  pallet: BalancePallet.AssetRegistry;
  function: BalanceFunction.AssetMetadatas | BalanceFunction.CurrencyMetadatas;
  path: ['minimalBalance'];
  params: [{ ForeignAssetId: AssetId } | { Token2: AssetId }];
}

export interface PalletBalancesAccountDataOld extends Struct {
  readonly free: u128;
  readonly reserved: u128;
  readonly miscFrozen: u128;
  readonly feeFrozen: u128;
}
