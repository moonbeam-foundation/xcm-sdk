import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { mgx, movr } from '../assets';
import { mangataKusama, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const mangataKusamaRoutes = new ChainRoutes({
  chain: mangataKusama,
  routes: [
    {
      source: {
        asset: mgx,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: mgx,
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: mgx,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: mgx,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
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
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
