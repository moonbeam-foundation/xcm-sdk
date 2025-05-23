import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { dev, devStage } from '../assets';
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
          amount: 0.1, // TODO
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .byGenesis(),
    },
  ],
});
