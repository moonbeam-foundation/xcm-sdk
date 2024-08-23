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
      asset: unit,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: unit,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .xcmPallet()
        .limitedReserveTransferAssets(0)
        .here(),
    },
  ],
});
