import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { cfg } from '../assets';
import { centrifuge, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const centrifugeRoutes = new ChainRoutes({
  chain: centrifuge,
  routes: [
    {
      asset: cfg,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: cfg,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
