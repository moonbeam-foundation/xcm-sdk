import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
import { dai, glmr, peaq, usdcwh, usdtwh, wbtc, weth } from '../assets';
import { moonbeam, peaqEvm } from '../chains';
import { AssetTransferConfig } from '../types/AssetTransferConfig';
import { ChainRoutesConfig } from '../types/ChainRoutesConfig';

export const peaqEvmConfig = new ChainRoutesConfig({
  assets: [
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
  chain: peaqEvm,
});
