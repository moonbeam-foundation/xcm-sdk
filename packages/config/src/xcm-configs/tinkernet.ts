import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { tnkr } from '../assets';
import { moonriver, tinkernet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const tinkernetRoutes = new ChainRoutes({
  chain: tinkernet,
  routes: [
    {
      source: {
        asset: tnkr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: tnkr,
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: tnkr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
