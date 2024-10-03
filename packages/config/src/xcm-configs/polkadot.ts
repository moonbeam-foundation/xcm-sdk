import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dot } from '../assets';
import { moonbeam, polkadot } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const polkadotRoutes = new ChainRoutes({
  chain: polkadot,
  routes: [
    {
      source: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra: 0.047,
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dot,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: dot,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .transferAssetsUsingTypeAndThen()
        .here(),
    },
  ],
});
