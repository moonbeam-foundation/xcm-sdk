import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { agng, dev, ftmwh } from '../assets';
import { moonbaseAlpha, peaqAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqAlphanetRoutes = new ChainRoutes({
  chain: peaqAlphanet,
  routes: [
    {
      asset: agng,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: agng,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: dev,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: agng,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.04,
          asset: dev,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
  ],
});
