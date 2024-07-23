import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { tnkr } from '../assets';
import { moonriver, tinkernet } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const tinkernetRoutes = new ChainRoutes({
  chain: tinkernet,
  routes: [
    new AssetRoute({
      asset: tnkr,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: tnkr,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
});
