import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { unit } from '../assets';
import { alphanetRelay, moonbaseAlpha } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const alphanetRelayRoutes = new ChainRoutes({
  chain: alphanetRelay,
  routes: [
    {
      source: {
        asset: unit,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: unit,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: unit,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          // amount: FeeBuilder()
          //   .xcmPaymentApi()
          //   .fromAssetIdQuery({ isAssetReserveChain: false }),
          amount: 0.001, // TODO remove this, force error in destination
          asset: unit,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .transferAssetsUsingTypeAndThen()
        .here(),
      /**
       * TODO maybe I  can put a `monitoring` property here in which it is
       * specified the pallet and method of events in both chains and even
       * how messageIds match in both chains
       */
    },
  ],
});
