import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dot } from '../assets';
import { moonbeam, polkadot } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const polkadotRoutes = new ChainRoutes({
  chain: polkadot,
  routes: [
    {
      asset: dot,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra: 0.047,
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .xcmPallet()
        .limitedReserveTransferAssets(0)
        .here(),
    },
  ],
});
