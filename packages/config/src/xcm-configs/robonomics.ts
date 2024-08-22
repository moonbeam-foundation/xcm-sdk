import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { xrt } from '../assets';
import { moonriver, robonomics } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const robonomicsRoutes = new ChainRoutes({
  chain: robonomics,
  routes: [
    {
      asset: xrt,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: xrt,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    },
  ],
});
