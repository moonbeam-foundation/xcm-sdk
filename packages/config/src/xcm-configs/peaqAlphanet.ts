import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { agng, dev, ftmwh } from '../assets';
import { moonbaseAlpha, peaqAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqAlphanetRoutes = new ChainRoutes({
  chain: peaqAlphanet,
  routes: [
    {
      asset: agng,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: agng,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.01,
          asset: dev,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: agng,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.04,
          asset: dev,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assets().asset(),
    },
  ],
});
