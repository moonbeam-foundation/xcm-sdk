import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ampe, dev } from '../assets';
import { moonbaseAlpha, pendulumAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const pendulumAlphanetRoutes = new ChainRoutes({
  chain: pendulumAlphanet,
  routes: [
    {
      source: {
        asset: ampe,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: ampe,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: ampe,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: ampe,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: ampe,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
            .fromPalletInstance({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
