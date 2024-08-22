import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { kint } from '../assets';
import { kintsugi, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const kintsugiRoutes = new ChainRoutes({
  chain: kintsugi,
  routes: [
    {
      asset: kint,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: kint,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: kbtc,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: kint,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: kint,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
  ],
});
