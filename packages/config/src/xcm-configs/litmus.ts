import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { lit } from '../assets';
import { litmus, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const litmusRoutes = new ChainRoutes({
  chain: litmus,
  routes: [
    {
      asset: lit,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: lit,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
