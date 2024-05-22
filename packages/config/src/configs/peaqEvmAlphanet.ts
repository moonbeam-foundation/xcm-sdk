import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import { dev, ftmwh } from '../assets';
import { moonbaseAlpha, peaqEvmAlphanet } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const peaqEvmAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: ftmwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.01,
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
      },
      // fee: {
      //   asset: dev,
      //   balance: BalanceBuilder().substrate().system().account(),
      // },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.01,
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
      },
      // fee: {
      //   asset: dev,
      //   balance: BalanceBuilder().substrate().system().account(),
      // },
    }),
  ],
  chain: peaqEvmAlphanet,
});
