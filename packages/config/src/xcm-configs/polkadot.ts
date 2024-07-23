import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dot } from '../assets';
import { moonbeam, polkadot } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const polkadotRoutes = new ChainRoutes({
  chain: polkadot,
  routes: [
    new AssetRoute({
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .limitedReserveTransferAssets(0)
        .here(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        extra: 0.047,
      },
    }),
  ],
});
