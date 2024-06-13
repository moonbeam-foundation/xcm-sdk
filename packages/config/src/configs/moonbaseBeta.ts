import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { alan, betaDEV, dev, ftmwh, usdcwh } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { moonbaseAlpha, moonbaseBeta } from '../xcmChains';

export const moonbaseBetaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
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
    new AssetConfig({
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
    new AssetConfig({
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
    new AssetConfig({
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
  chain: moonbaseBeta,
});
