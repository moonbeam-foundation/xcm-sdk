import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { teer } from '../assets';
import { integritee, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const integriteeRoutes = new ChainRoutes({
  chain: integritee,
  routes: [
    {
      asset: teer,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: teer,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
