import {
  BalanceBuilder,
  ContractBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { lamaGLMR, pizza, pizzaUSDC, samaMOVR } from '../assets';
import { moonlama, moonsama } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonlamaRoutes = new ChainRoutes({
  chain: moonlama,
  routes: [
    {
      source: {
        asset: lamaGLMR,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: lamaGLMR,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: lamaGLMR,
        chain: moonsama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
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
        asset: samaMOVR,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: samaMOVR,
        chain: moonsama,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: samaMOVR,
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
        asset: pizza,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: pizza,
        chain: moonsama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: pizza,
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
        asset: pizzaUSDC,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: pizzaUSDC,
        chain: moonsama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: pizzaUSDC,
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
