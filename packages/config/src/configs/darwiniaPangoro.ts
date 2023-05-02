import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { paring } from '../assets';
import { darwiniaPangoro, moonbaseAlpha } from '../chains';

export const darwiniaPangoroConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: paring,
      balance: BalanceBuilder().system().account(),
      destinations: [moonbaseAlpha],
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
  chain: darwiniaPangoro,
});
