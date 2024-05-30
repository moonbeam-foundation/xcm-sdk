import { BalanceBuilder } from '@moonbeam-network/xcm-builder';
import { glmr } from '../assets';
import { moonbaseAlpha, peaqEvm } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const peaqEvmConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().evm().erc20(),
      // contract: ContractBuilder().Xtokens().transfer(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      // fee: {
      //   asset: dev,
      //   balance: BalanceBuilder().substrate().system().account(),
      // },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().evm().erc20(),
      // contract: ContractBuilder().Xtokens().transfer(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      // fee: {
      //   asset: dev,
      //   balance: BalanceBuilder().substrate().system().account(),
      // },
    }),
  ],
  chain: peaqEvm,
});
