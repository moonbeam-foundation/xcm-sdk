import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dev, tur } from '../assets';
import { moonbaseAlpha, turingAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const turingAlphanetRoutes = new ChainRoutes({
  chain: turingAlphanet,
  routes: [
    {
      source: {
        asset: tur,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: tur,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: tur,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(turingAlphanet.parachainId)
        .X1(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: tur,
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
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
