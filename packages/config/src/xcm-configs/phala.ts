import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, pha } from '../assets';
import { moonbeam, phala } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const phalaRoutes = new ChainRoutes({
  chain: phala,
  routes: [
    {
      source: {
        asset: pha,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: pha,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: pha,
        },
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().here(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: pha,
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
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().X2(),
    },
  ],
});
