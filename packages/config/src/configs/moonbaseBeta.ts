import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { alan, betaDEV, dev, ftmwh, usdcwh } from '../assets';
import { moonbaseAlpha, moonbaseBeta } from '../chains';
import { AssetTransferConfig } from '../types/AssetTransferConfig';
import { ChainRoutesConfig } from '../types/ChainRoutesConfig';

export const moonbaseBetaConfig = new ChainRoutesConfig({
  assets: [
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
