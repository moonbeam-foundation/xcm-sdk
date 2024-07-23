import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
import { dai, glmr, peaq, usdcwh, usdtwh, wbtc, weth } from '../assets';
import { moonbeam, peaqEvm } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqEvmRoutes = new ChainRoutes({
  chain: peaqEvm,
  routes: [
    new AssetRoute({
      asset: glmr,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: usdcwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: dai,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: wbtc,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: weth,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: usdtwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
});
