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
        min: AssetMinBuilder().assets().asset(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      transfer: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: dai,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      transfer: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: wbtc,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      transfer: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: weth,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      transfer: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: usdtwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      transfer: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
  ],
});
