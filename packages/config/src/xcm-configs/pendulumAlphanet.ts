import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ampe, dev } from '../assets';
import { moonbaseAlpha, pendulumAlphanet } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const pendulumAlphanetRoutes = new ChainRoutes({
  chain: pendulumAlphanet,
  routes: [
    new AssetRoute({
      asset: ampe,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: ampe,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetRoute({
      asset: dev,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.01,
        asset: dev,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: ampe,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
});
