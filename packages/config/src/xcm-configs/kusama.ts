import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ksm } from '../assets';
import { kusama, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const kusamaRoutes = new ChainRoutes({
  chain: kusama,
  routes: [
    {
      asset: ksm,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: ksm,
          balance: BalanceBuilder().substrate().system().account(),
          extra: 0.002,
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: ksm,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .limitedReserveTransferAssets(0)
        .here(),
    },
  ],
});
