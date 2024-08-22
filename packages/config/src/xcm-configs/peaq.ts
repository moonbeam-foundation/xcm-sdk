import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dai, glmr, peaq, usdcwh, usdtwh, wbtc, weth } from '../assets';
import { moonbeam, peaqChain } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqRoutes = new ChainRoutes({
  chain: peaqChain,
  routes: [
    {
      asset: peaq,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: dai,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: wbtc,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: weth,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: usdtwh,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assets().asset(),
    },
  ],
});
