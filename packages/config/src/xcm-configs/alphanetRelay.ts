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
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: unit,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .transferAssetsUsingTypeAndThen()
        .here(),
    },
  ],
});
