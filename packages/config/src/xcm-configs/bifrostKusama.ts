import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { bnc, movr, vbnc, vksm, vmovr } from '../assets';
import { bifrostKusama, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

const monitoringToMoonriver = MonitoringBuilder()
  .monitorEvent()
  .polkadotXcm()
  .messageQueue();

export const bifrostKusamaRoutes = new ChainRoutes({
  chain: bifrostKusama,
  routes: [
    {
      source: {
        asset: bnc,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: bnc,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: bnc,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssets()
        .X1GeneralKey(),
      monitoring: monitoringToMoonriver,
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
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
            .fromPalletInstance({ isAssetReserveChain: true }),
          asset: movr,
        },
      },
      extrinsic: ExtrinsicBuilder().polkadotXcm().transferAssets().X2(),
      monitoring: monitoringToMoonriver,
    },
    {
      source: {
        asset: vbnc,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: vbnc,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: bnc,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssets()
        .X1GeneralKey(),
      monitoring: monitoringToMoonriver,
    },
    {
      source: {
        asset: vksm,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: vksm,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: bnc,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssets()
        .X1GeneralKey(),
      monitoring: monitoringToMoonriver,
    },
    {
      source: {
        asset: vmovr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: vmovr,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: bnc,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssets()
        .X1GeneralKey(),
      monitoring: monitoringToMoonriver,
    },
  ],
});
