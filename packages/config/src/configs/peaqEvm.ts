import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
import { dai, glmr, peaq, usdcwh, usdtwh, wbtc, weth } from '../assets';
import { moonbeam, peaqEvm } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const peaqEvmConfig = new ChainConfig({
  assets: [
    new AssetConfig({
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
    new AssetConfig({
      asset: usdcwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.08,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: dai,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.1,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: wbtc,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.08,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: weth,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.08,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: usdtwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.08,
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
  chain: peaqEvm,
});
