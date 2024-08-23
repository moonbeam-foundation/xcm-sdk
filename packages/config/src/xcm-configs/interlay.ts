import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, intr } from '../assets';
import { interlay, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const interlayRoutes = new ChainRoutes({
  chain: interlay,
  routes: [
    {
      asset: intr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: intr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: ibtc,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: intr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: intr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.001,
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
