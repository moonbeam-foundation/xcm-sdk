import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ksm } from '../assets';
import { kusama, moonriver } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const kusamaRoutes = new ChainRoutes({
  chain: kusama,
  routes: [
    new AssetRoute({
      asset: ksm,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: ksm,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .limitedReserveTransferAssets(0)
        .here(),
      fee: {
        asset: ksm,
        balance: BalanceBuilder().substrate().system().account(),
        extra: 0.002,
      },
    }),
  ],
});
