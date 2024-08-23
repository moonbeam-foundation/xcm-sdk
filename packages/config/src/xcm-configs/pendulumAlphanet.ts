import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ampe, dev } from '../assets';
import { moonbaseAlpha, pendulumAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const pendulumAlphanetRoutes = new ChainRoutes({
  chain: pendulumAlphanet,
  routes: [
    {
      asset: ampe,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: ampe,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: ampe,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: dev,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
