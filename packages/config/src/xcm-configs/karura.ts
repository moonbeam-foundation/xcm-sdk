import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { aseed, kar, movr } from '../assets';
import { karura, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const karuraRoutes = new ChainRoutes({
  chain: karura,
  routes: [
    {
      asset: kar,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: kar,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: aseed,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: kar,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: aseed,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: kar,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        chain: moonriver,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0001,
          asset: movr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});