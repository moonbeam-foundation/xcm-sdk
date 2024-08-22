import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { crab } from '../assets';
import { darwiniaCrab, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const darwiniaCrabRoutes = new ChainRoutes({
  chain: darwiniaCrab,
  routes: [
    {
      asset: crab,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: crab,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    },
  ],
});
