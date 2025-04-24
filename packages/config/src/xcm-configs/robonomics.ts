import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { xrt } from '../assets';
import { moonriver, robonomics } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const robonomicsRoutes = new ChainRoutes({
  chain: robonomics,
  routes: [
    {
      source: {
        asset: xrt,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: xrt,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: xrt,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: xrt,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    },
  ],
});
