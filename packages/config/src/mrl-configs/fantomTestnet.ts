import {
  BalanceBuilder,
  FeeBuilder,
  MrlBuilder,
} from '@moonbeam-network/xcm-builder';
import { ftmwh, hdx } from '../assets';
import { fantomTestnet, hydrationAlphanet } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const fantomTestnetRoutes = new ChainRoutes({
  chain: fantomTestnet,
  routes: [
    new AssetRoute({
      asset: ftmwh,
      balance: BalanceBuilder().substrate().system().account(), // TODO:
      destination: hydrationAlphanet,
      destinationFee: {
        // TODO:
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: hdx,
        balance: BalanceBuilder().substrate().system().account(),
      },
      mrl: MrlBuilder()
        .wormhole()
        .wormhole()
        .tokenTransfer({ isAutomatic: true }),
    }),
  ],
});
