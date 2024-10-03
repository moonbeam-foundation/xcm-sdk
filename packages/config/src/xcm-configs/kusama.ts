import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ksm } from '../assets';
import { kusama, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const kusamaRoutes = new ChainRoutes({
  chain: kusama,
  routes: [
    {
      source: {
        asset: ksm,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: ksm,
          balance: BalanceBuilder().substrate().system().account(),
          extra: 0.002,
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: ksm,
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: ksm,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .transferAssetsUsingTypeAndThen()
        .here(),
    },
  ],
});
