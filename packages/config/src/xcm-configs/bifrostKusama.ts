import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { bnc, movr, vbnc, vksm, vmovr } from '../assets';
import { bifrostKusama, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const bifrostKusamaRoutes = new ChainRoutes({
  chain: bifrostKusama,
  routes: [
    {
      asset: bnc,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: 0.0001,
          asset: movr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: vbnc,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: vksm,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: vmovr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
  ],
});
