import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { agng, dev, ftmwh } from '../assets';
import { moonbaseAlpha, peaqEvmAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqEvmAlphanetRoutes = new ChainRoutes({
  chain: peaqEvmAlphanet,
  routes: [
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: agng,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: agng,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: dev,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
  ],
});
