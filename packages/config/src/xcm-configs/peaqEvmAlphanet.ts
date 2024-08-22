import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
import { agng, dev, ftmwh } from '../assets';
import { moonbaseAlpha, peaqEvmAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqEvmAlphanetRoutes = new ChainRoutes({
  chain: peaqEvmAlphanet,
  routes: [
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: agng,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.01,
          asset: dev,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: agng,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: moonbaseAlpha,
        fee: {
          amount: 0.01,
          asset: dev,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      min: AssetMinBuilder().assets().asset(),
    },
  ],
});
