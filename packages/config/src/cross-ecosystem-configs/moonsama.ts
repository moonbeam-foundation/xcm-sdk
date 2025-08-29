import {
  BalanceBuilder,
  ExtrinsicBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { Ecosystem } from '@moonbeam-network/xcm-types';
import { pizza, pizzaUSDC, samaMOVR } from '../assets';
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
          amount: 0.01,
          // amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
          //   isAssetReserveChain: false,
          //   isEcosystemBridge: true,
          // }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem({
          globalConsensus: Ecosystem.Polkadot,
        })
        .X1(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      // ! this still is broken
      source: {
        asset: pizza,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: samaMOVR,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: pizza,
        chain: moonlama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: pizza,
          amount: 0.1,
          // amount: FeeBuilder().xcmPaymentApi().fromSourceAccountKey20({
          //   isAssetReserveChain: true,
          //   isEcosystemBridge: true,
          // }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem({
          globalConsensus: Ecosystem.Polkadot,
        })
        .X3(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      // ! this still is broken
      source: {
        asset: pizzaUSDC,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: pizzaUSDC,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: pizzaUSDC,
        chain: moonlama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: pizzaUSDC,
          amount: 0.1,
          // amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
          //   isAssetReserveChain: false,
          //   isEcosystemBridge: true,
          // }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem({
          globalConsensus: Ecosystem.Polkadot,
        })
        .X2(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
