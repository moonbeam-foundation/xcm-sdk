import {
  BalanceBuilder,
  ExtrinsicBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { Ecosystem } from '@moonbeam-network/xcm-types';
import { lamaGLMR, pizza, pizzaUSDC } from '../assets';
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
          amount: 0.0001,
          // amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
          //   isAssetReserveChain: false,
          //   isEcosystemBridge: true,
          // }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X4({
          globalConsensus: Ecosystem.Kusama,
        }),
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
          amount: 0.0001,
          // amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
          //   isAssetReserveChain: false,
          //   isEcosystemBridge: true,
          // }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X2({
          globalConsensus: Ecosystem.Kusama,
        }),
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
          amount: 0.0001,
          // amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
          //   isAssetReserveChain: false,
          //   isEcosystemBridge: true,
          // }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X2({
          globalConsensus: Ecosystem.Kusama,
        }),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
