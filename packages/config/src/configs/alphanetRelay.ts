import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { unit } from '../assets';
import { alphanetRelay, moonbaseAlpha } from '../chains';

export const alphanetRelayConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: unit,
      balance: BalanceBuilder().system().account(),
      destinations: [moonbaseAlpha],
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .limitedReserveTransferAssets()
        .here(),
    }),
  ],
  chain: alphanetRelay,
});
