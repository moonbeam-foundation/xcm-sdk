import '@moonbeam-network/api-augment';

import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { AssetSymbol } from '../constants';
import { AssetId } from '../interfaces';
import {
  BalanceCurrencyTypes,
  BalanceFunction,
  BalancePallet,
} from './balance.constants';
import {
  AssetsBalanceConfig,
  MinBalanceAssetRegistryConfig,
  MinBalanceAssetsConfig,
  OrmlTokensBalanceConfig,
  SystemBalanceConfig,
  TokensBalanceConfig,
  TokensBalanceParamAsset,
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
    tokens: () => tokens<Symbols>(),
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

function minAssetPallet(asset: AssetId): MinBalanceAssetsConfig {
  return {
    pallet: BalancePallet.Assets,
    function: BalanceFunction.Asset,
    path: ['minBalance'],
    params: [asset],
  };
}

function minAssetRegistryPallet(asset: AssetId): MinBalanceAssetRegistryConfig {
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

function tokens<Symbols extends AssetSymbol = AssetSymbol>() {
  return {
    token: (asset: Symbols | 'MOVR' | 'KUSD' | 'AUSD') => token<Symbols>(asset),
    foreignAsset: (asset: AssetId | Symbols) => foreignAsset<Symbols>(asset),
    miningResource: (asset: AssetId) => miningResource<Symbols>(asset),
    fungibleToken: (asset: AssetId) => fungibleToken<Symbols>(asset),
  };
}

function token<Symbols extends AssetSymbol = AssetSymbol>(
  asset: Symbols | 'MOVR' | 'KUSD' | 'AUSD',
) {
  return tokensBase<Symbols>({ [BalanceCurrencyTypes.Token]: asset });
}

function foreignAsset<Symbols extends AssetSymbol = AssetSymbol>(
  asset: AssetId,
) {
  return tokensBase<Symbols>({ [BalanceCurrencyTypes.ForeignAsset]: asset });
}

function miningResource<Symbols extends AssetSymbol = AssetSymbol>(
  asset: AssetId,
) {
  return tokensBase<Symbols>({ [BalanceCurrencyTypes.MiningResource]: asset });
}

function fungibleToken<Symbols extends AssetSymbol = AssetSymbol>(
  asset: AssetId,
) {
  return tokensBase<Symbols>({ [BalanceCurrencyTypes.FungibleToken]: asset });
}

function tokensBase<Symbols extends AssetSymbol = AssetSymbol>(
  asset: TokensBalanceParamAsset<Symbols>,
): TokensBalanceConfig<Symbols> {
  return {
    pallet: BalancePallet.Tokens,
    function: BalanceFunction.Accounts,
    path: [],
    getParams: (account: string) => [account, asset],
    calc: ({ free, frozen }: TokensPalletAccountData) =>
      BigInt(free.sub(frozen).toString()),
  };
}
