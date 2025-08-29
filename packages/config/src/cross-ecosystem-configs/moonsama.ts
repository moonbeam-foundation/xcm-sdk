import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { Ecosystem } from '@moonbeam-network/xcm-types';
import { lamaGLMR, movrsama, pizza, pizzaUSDC } from '../assets';
import { moonlama, moonsama } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonsamaRoutes = new ChainRoutes({
  chain: moonsama,
  routes: [
    {
      // ! this still is broken
      source: {
        asset: movrsama,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: movrsama,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: lamaGLMR,
        chain: moonlama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().evm().erc20(),
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
        chain: moonlama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
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
        .X2(),
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
        chain: moonlama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
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
        .X2(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
