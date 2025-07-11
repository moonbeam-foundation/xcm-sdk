import {
  BalanceBuilder,
  EventMonitoringBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { devBeta, devStage } from '../assets';
import { moonbaseBeta, moonbaseStage } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseStageRoutes = new ChainRoutes({
  chain: moonbaseStage,
  routes: [
    {
      source: {
        asset: devStage,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: devStage,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: devStage,
        chain: moonbaseBeta,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.1, // TODO calculate
          asset: devStage,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X1(),
      monitoring: EventMonitoringBuilder().bridgeMessages().bridgeMessages(),
    },
    {
      source: {
        asset: devBeta,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: devStage,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: devBeta,
        chain: moonbaseBeta,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: devBeta,
          amount: 0.1, // TODO calculate
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X3(),
      monitoring: EventMonitoringBuilder().bridgeMessages().bridgeMessages(),
    },
  ],
});
