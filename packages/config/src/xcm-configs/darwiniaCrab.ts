import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { crab } from '../assets';
import { darwiniaCrab, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const darwiniaCrabRoutes = new ChainRoutes({
  chain: darwiniaCrab,
  routes: [
    {
      source: {
        asset: crab,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: crab,
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: crab,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    },
  ],
});
