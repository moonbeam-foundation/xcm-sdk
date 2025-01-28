import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { astr, glmr } from '../assets';
import { astar, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const astarRoutes = new ChainRoutes({
  chain: astar,
  routes: [
    {
      source: {
        asset: astr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: astr,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: astr,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(astar.parachainId)
        .here(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: astr,
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
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
