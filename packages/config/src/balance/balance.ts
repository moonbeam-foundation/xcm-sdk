import '@moonbeam-network/api-augment';

import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { AssetSymbol } from '../constants';
import { AssetId } from '../interfaces';
import { BalanceFunction, BalancePallet } from './balance.constants';
import {
  AssetsBalanceConfig,
  MinBalanceConfig,
  OrmlTokensBalanceConfig,
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
    minAssetPallet,
    minAssetRegistryPallet,
    ormlTokens,
    system,
    tokens: (asset: number | bigint | Symbols | 'MOVR' | 'KUSD' | 'AUSD') =>
      tokens<Symbols>(asset),
  };
}

function assets(asset: AssetId): AssetsBalanceConfig {
  return {
    pallet: BalancePallet.Assets,
    function: BalanceFunction.Account,
    path: ['balance'],
    getParams: (account: string) => [asset, account],
    calc: (balance: u128) => balance.toBigInt(),
  };
}

function minAssetPallet(asset: AssetId): MinBalanceConfig {
  return {
    pallet: BalancePallet.Assets,
    function: BalanceFunction.Asset,
    path: ['minBalance'],
    params: [asset],
  };
}

function minAssetRegistryPallet(asset: AssetId): MinBalanceConfig {
  return {
    pallet: BalancePallet.AssetRegistry,
    function: BalanceFunction.AssetMetadatas,
    path: ['minimalBalance'],
    params: [{ ForeignAssetId: asset }],
  };
}

function ormlTokens(asset: AssetId): OrmlTokensBalanceConfig {
  return {
    pallet: BalancePallet.OrmlTokens,
    function: BalanceFunction.Accounts,
    path: [],
    getParams: (account: string) => [account, { ForeignAsset: asset }],
    calc: ({ free, frozen }: TokensPalletAccountData) =>
      BigInt(free.sub(frozen).toString()),
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
