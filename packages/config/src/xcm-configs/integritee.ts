import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { teer } from '../assets';
import { integritee, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const integriteeRoutes = new ChainRoutes({
  chain: integritee,
  routes: [
    {
      source: {
        asset: teer,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: teer,
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: teer,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
