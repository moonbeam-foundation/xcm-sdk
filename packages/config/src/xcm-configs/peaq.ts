import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dai, glmr, peaq, usdcwh, usdtwh, wbtc, weth } from '../assets';
import { moonbeam, peaqChain } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqRoutes = new ChainRoutes({
  chain: peaqChain,
  routes: [
    new AssetRoute({
      asset: peaq,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetRoute({
      asset: glmr,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: usdcwh,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: dai,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: wbtc,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: weth,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: usdtwh,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
});
