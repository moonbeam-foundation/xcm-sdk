import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { otp } from '../assets';
import { moonbaseAlpha, originTrailAlphanet } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const originTrailAlphanetRoutes = new ChainRoutes({
  chain: originTrailAlphanet,
  routes: [
    new AssetRoute({
      asset: otp,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: otp,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
});
