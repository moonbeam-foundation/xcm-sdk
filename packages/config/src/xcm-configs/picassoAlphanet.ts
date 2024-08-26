import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { atom, dev, pica } from '../assets';
import { moonbaseAlpha, picassoAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const picassoAlphanetRoutes = new ChainRoutes({
  chain: picassoAlphanet,
  routes: [
    {
      asset: pica,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: pica,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: atom,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: pica,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: pica,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: pica,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0001,
          asset: dev,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
