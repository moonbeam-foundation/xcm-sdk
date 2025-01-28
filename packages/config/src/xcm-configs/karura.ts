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
      source: {
        asset: kar,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: kar,
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: kar,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: aseed,
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
        asset: aseed,
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: aseed,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: movr,
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
        asset: movr,
        chain: moonriver,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: movr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
