import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ftmwh, hdx } from '../assets';
import { fantomTestnet, hydrationAlphanet } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const hydrationAlphanetRoutes = new ChainRoutes({
  chain: hydrationAlphanet,
  routes: [
    new AssetRoute({
      asset: ftmwh,
      balance: BalanceBuilder().substrate().system().account(), // TODO:
      destination: fantomTestnet,
      destinationFee: {
        // TODO:
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: hdx,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(), // TODO:
    }),
  ],
});
