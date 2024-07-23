import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
import { agng, dev, ftmwh } from '../assets';
import { moonbaseAlpha, peaqEvmAlphanet } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqEvmAlphanetRoutes = new ChainRoutes({
  chain: peaqEvmAlphanet,
  routes: [
    new AssetRoute({
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
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: dev,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
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
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
});
