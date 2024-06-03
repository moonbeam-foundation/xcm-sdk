import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import { agng, dev, ftmwh } from '../assets';
import { moonbaseAlpha, peaqEvmAlphanet } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const peaqEvmAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: ftmwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.01,
        asset: dev,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: agng,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.01,
        asset: dev,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: agng,
        balance: BalanceBuilder().substrate().system().accountEvmTo32(),
      },
    }),

    // new AssetConfig({
    //   asset: agng,
    //   balance: BalanceBuilder().substrate().system().accountEvmTo32(),
    //   contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    //   destination: moonbaseAlpha,
    //   destinationFee: {
    //     amount: 0.01,
    //     asset: dev,
    //     balance: BalanceBuilder().evm().erc20(),
    //   },
    //   fee: {
    //     asset: agng,
    //     balance: BalanceBuilder().substrate().system().account(),
    //   },
    // }),
  ],
  chain: peaqEvmAlphanet,
});
