import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { bnc, movr, vbnc, vksm, vmovr } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { bifrostKusama, moonriver } from '../xcmChains';

export const bifrostKusamaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: bnc,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: 0.0001,
        asset: movr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: bnc,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    }),
    new AssetConfig({
      asset: vbnc,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: 0.2,
        asset: bnc,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: bnc,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    }),
    new AssetConfig({
      asset: vksm,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: 0.2,
        asset: bnc,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: bnc,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    }),
    new AssetConfig({
      asset: vmovr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: 0.2,
        asset: bnc,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: bnc,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    }),
  ],
  chain: bifrostKusama,
});
