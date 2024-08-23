import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, para } from '../assets';
import { moonbeam, parallel } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const parallelRoutes = new ChainRoutes({
  chain: parallel,
  routes: [
    {
      asset: para,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: para,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(parallel.parachainId)
        .X2(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: para,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
