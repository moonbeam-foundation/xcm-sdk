import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { pha } from '../assets';
import { moonbeam, phala } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const phalaRoutes = new ChainRoutes({
  chain: phala,
  routes: [
    {
      source: {
        asset: pha,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: pha,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: pha,
        },
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().here(),
    },
  ],
});
