import {
  BalanceBuilder,
  ContractBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { lamaGLMR, pizza, pizzaUSDC, samaMOVR } from '../assets';
import { moonlama, moonsama } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonsamaRoutes = new ChainRoutes({
  chain: moonsama,
  routes: [
    {
      source: {
        asset: samaMOVR,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: samaMOVR,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: samaMOVR,
        chain: moonlama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: samaMOVR,
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsLocation(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: lamaGLMR,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: samaMOVR,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: lamaGLMR,
        chain: moonlama,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: lamaGLMR,
          amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
            isAssetReserveChain: true,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X3(),
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
          asset: samaMOVR,
          balance: BalanceBuilder().evm().erc20(),
        },
        destinationFee: {
          asset: lamaGLMR,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: pizza,
        chain: moonlama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstanceAndAccountKey20({
              isAssetReserveChain: true,
              isEcosystemBridge: true,
            }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X4(),
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
          asset: samaMOVR,
          balance: BalanceBuilder().evm().erc20(),
        },
        destinationFee: {
          asset: lamaGLMR,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: pizzaUSDC,
        chain: moonlama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstanceAndAccountKey20({
              isAssetReserveChain: true,
              isEcosystemBridge: true,
            }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X4(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
