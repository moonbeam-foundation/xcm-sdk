import '@polkadot/api-augment';

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
  EquilibriumSystemBalanceConfig,
  EquilibriumSystemBalanceData,
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
    minCurrencyMetadata,
    ormlTokens,
    system,
    systemEquilibrium,
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

function minCurrencyMetadata(asset: AssetId): MinBalanceAssetRegistryConfig {
  return {
    pallet: BalancePallet.AssetRegistry,
    function: BalanceFunction.CurrencyMetadatas,
    path: ['minimalBalance'],
    params: [{ Token2: asset }],
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

function systemEquilibrium(id: number): EquilibriumSystemBalanceConfig {
  return {
    pallet: BalancePallet.System,
    function: BalanceFunction.Account,
    path: ['data'],
    getParams: (account: string) => [account],
    calc: (data) => {
      if (data.isEmpty) {
        return 0n;
      }

      const balances = data.toJSON() as any as EquilibriumSystemBalanceData;
      const balance = balances.find(([assetId]) => assetId === id);

      if (!balance) {
        return 0n;
      }

      return BigInt(balance[1].positive);
    },
  };
}

function tokens<Symbols extends AssetSymbol = AssetSymbol>() {
  return {
    foreignAsset: (asset: AssetId | Symbols) =>
      tokensBase<Symbols>({ [BalanceCurrencyTypes.ForeignAsset]: asset }),
    fungibleToken: (asset: AssetId) =>
      tokensBase<Symbols>({ [BalanceCurrencyTypes.FungibleToken]: asset }),
    miningResource: (asset: AssetId) =>
      tokensBase<Symbols>({ [BalanceCurrencyTypes.MiningResource]: asset }),
    token: (asset: Symbols | AssetSymbol.KUSD) =>
      tokensBase<Symbols>({ [BalanceCurrencyTypes.Token]: asset }),
    token2: (asset: AssetId) =>
      tokensBase<Symbols>({ [BalanceCurrencyTypes.Token2]: asset }),
  };
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
