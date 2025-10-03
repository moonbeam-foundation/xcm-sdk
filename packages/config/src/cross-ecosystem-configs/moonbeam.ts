import {
  BalanceBuilder,
  ContractBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, movr, usdc, usdcwh, usdt } from '../assets';
import { moonbeam, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbeamRoutes = new ChainRoutes({
  chain: moonbeam,
  routes: [
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: glmr,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .nativeAsset(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: movr,
        chain: moonriver,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: movr,
          amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
            isAssetReserveChain: true,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .foreignAsset(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: usdc,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: usdc,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: usdc,
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .localErc20(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: usdcwh,
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .localErc20(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: usdt,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: usdt,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: usdt,
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .localErc20(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
