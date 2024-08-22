import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dev, ftmwh, hdx, usdcwh } from '../assets';
import { hydrationAlphanet, moonbaseAlpha } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

// FIXME: has to be verified
export const hydrationAlphanetRoutes = new ChainRoutes({
  chain: hydrationAlphanet,
  routes: [
    {
      asset: hdx,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.01,
          asset: dev,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.04,
          asset: dev,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.04,
          asset: dev,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
  ],
});
