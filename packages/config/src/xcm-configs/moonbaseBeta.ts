import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { betaDEV, dev, ftmwh, usdcwh } from '../assets';
import { moonbaseAlpha, moonbaseBeta } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseBetaRoutes = new ChainRoutes({
  chain: moonbaseBeta,
  routes: [
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: betaDEV,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.0002,
          asset: dev,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: alan,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: betaDEV,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.002,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: betaDEV,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.002,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: betaDEV,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.002,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
  ],
});
