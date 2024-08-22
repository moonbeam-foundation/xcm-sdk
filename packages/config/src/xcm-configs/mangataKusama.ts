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
      asset: mgx,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: mgx,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: mgx,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: 0.000008,
          asset: movr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
