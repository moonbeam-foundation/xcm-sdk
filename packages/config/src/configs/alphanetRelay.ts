import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { unit } from '../assets';
import { alphanetRelay, moonbaseAlpha } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const alphanetRelayConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: unit,
      balance: BalanceBuilder().system().account(),
      destinations: moonbaseAlpha,
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .limitedReserveTransferAssets()
        .here(),
    }),
  ],
  chain: alphanetRelay,
});
