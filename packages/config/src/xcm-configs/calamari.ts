import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { kma, movr } from '../assets';
import { calamari, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const calamariRoutes = new ChainRoutes({
  chain: calamari,
  routes: [
    {
      asset: kma,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: kma,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: kma,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonriver,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0001,
          asset: movr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
