import {
  BalanceBuilder,
  ExtrinsicBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { devBeta, devStage, pizza } from '../assets';
import { moonbaseBeta, moonbaseStage } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseBetaRoutes = new ChainRoutes({
  chain: moonbaseBeta,
  routes: [
    {
      source: {
        asset: devBeta,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: devBeta,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: devBeta,
        chain: moonbaseStage,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: devBeta,
          amount: 0.1, // TODO calculate
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X1(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .bridgeMessages()
        .bridgeMessages(),
    },
    {
      source: {
        asset: devStage,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: devBeta,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: devStage,
        chain: moonbaseStage,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: devStage,
          amount: 0.1, // TODO calculate
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X3(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .bridgeMessages()
        .bridgeMessages(),
    },
    {
      source: {
        asset: pizza,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: devBeta,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: pizza,
        chain: moonbaseStage,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: pizza,
          amount: 0.1, // TODO calculate
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X2(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .bridgeMessages()
        .bridgeMessages(),
    },
  ],
});
