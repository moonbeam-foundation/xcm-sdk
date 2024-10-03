import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dai, glmr, peaq, usdcwh, usdtwh, wbtc, weth } from '../assets';
import { moonbeam, peaqEvm } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqEvmRoutes = new ChainRoutes({
  chain: peaqEvm,
  routes: [
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: glmr,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      source: {
        asset: dai,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: dai,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      source: {
        asset: wbtc,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: wbtc,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      source: {
        asset: weth,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: weth,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      source: {
        asset: usdtwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdtwh,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
  ],
});
