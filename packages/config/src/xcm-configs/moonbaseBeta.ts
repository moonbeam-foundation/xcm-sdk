import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { alan, betaDEV, dev, ftmwh, usdcwh } from '../assets';
import { moonbaseAlpha, moonbaseBeta } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseBetaRoutes = new ChainRoutes({
  chain: moonbaseBeta,
  routes: [
    new AssetRoute({
      asset: dev,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.0002,
        asset: dev,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: betaDEV,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: alan,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.002,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: betaDEV,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: usdcwh,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.002,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: betaDEV,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: ftmwh,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.002,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: betaDEV,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
});
