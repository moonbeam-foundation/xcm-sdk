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
      source: {
        asset: para,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: para,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: para,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(parallel.parachainId)
        .X2(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: para,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: glmr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});