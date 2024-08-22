import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
import { dai, glmr, peaq, usdtwh, wbtc, weth } from '../assets';
import { moonbeam, peaqEvm } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqEvmRoutes = new ChainRoutes({
  chain: peaqEvm,
  routes: [
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: dai,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: wbtc,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: weth,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: usdtwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      min: AssetMinBuilder().assets().asset(),
    },
  ],
});
