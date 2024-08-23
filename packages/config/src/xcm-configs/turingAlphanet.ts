import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dev, tur } from '../assets';
import { moonbaseAlpha, turingAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const turingAlphanetRoutes = new ChainRoutes({
  chain: turingAlphanet,
  routes: [
    {
      asset: tur,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: tur,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(turingAlphanet.parachainId)
        .X1(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: tur,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.04,
          asset: dev,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
