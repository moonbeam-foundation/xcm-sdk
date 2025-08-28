import {
  BalanceBuilder,
  ExtrinsicBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { lama, pizza, pizzaUSDC } from '../assets';
import { moonlama, moonsama } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonlamaRoutes = new ChainRoutes({
  chain: moonlama,
  routes: [
    {
      source: {
        asset: pizza,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lama,
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
          asset: lama,
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
        .X2(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
