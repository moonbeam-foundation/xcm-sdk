import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dev, tur } from '../assets';
import { moonbaseAlpha, turingAlphanet } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const turingAlphanetRoutes = new ChainRoutes({
  chain: turingAlphanet,
  routes: [
    new AssetRoute({
      asset: tur,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: tur,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(turingAlphanet.parachainId)
        .X1(),
    }),
    new AssetRoute({
      asset: dev,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.04,
        asset: dev,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: tur,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
});
