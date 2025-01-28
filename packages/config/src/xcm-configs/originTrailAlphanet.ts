import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { otp } from '../assets';
import { moonbaseAlpha, originTrailAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const originTrailAlphanetRoutes = new ChainRoutes({
  chain: originTrailAlphanet,
  routes: [
    {
      source: {
        asset: otp,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: otp,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: otp,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    },
  ],
});
