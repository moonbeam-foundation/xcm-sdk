import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { nodl } from '../assets';
import { moonbeam, nodle } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const nodleRoutes = new ChainRoutes({
  chain: nodle,
  routes: [
    {
      asset: nodl,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: nodl,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
