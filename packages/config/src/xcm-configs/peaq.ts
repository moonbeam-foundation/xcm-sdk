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
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: dai,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: wbtc,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: weth,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: usdtwh,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
  ],
});
