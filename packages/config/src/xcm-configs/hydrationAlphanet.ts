import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dev, ftmwh, hdx, usdcwh } from '../assets';
import { hydrationAlphanet, moonbaseAlpha } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

// FIXME: has to be verified
export const hydrationAlphanetRoutes = new ChainRoutes({
  chain: hydrationAlphanet,
  routes: [
    {
      source: {
        asset: hdx,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: hdx,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: hdx,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
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
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
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
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
  ],
});
