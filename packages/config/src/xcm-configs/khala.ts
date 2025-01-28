import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { movr, pha } from '../assets';
import { khala, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const khalaRouts = new ChainRoutes({
  chain: khala,
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
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: pha,
        },
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().here(),
    },
    {
      source: {
        asset: movr,
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
        asset: movr,
        chain: moonriver,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: movr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().X2(),
    },
  ],
});
