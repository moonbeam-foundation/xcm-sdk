import { u128 } from '@polkadot/types';
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
  | OrmlTokensBalanceConfig
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
    | { [BalanceCurrencyTypes.Token2]: AssetId };

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
