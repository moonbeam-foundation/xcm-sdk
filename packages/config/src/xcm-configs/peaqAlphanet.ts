import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { agng, dev, ftmwh } from '../assets';
import { moonbaseAlpha, peaqAlphanet } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqAlphanetRoutes = new ChainRoutes({
  chain: peaqAlphanet,
  routes: [
    new AssetRoute({
      asset: agng,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: agng,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetRoute({
      asset: dev,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.01,
        asset: dev,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: ftmwh,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.04,
        asset: dev,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: agng,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
});
