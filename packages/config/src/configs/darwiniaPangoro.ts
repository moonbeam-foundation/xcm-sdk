import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { paring } from '../assets';
import { darwiniaPangoro, moonbaseAlpha } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const darwiniaPangoroConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: paring,
      balance: BalanceBuilder().system().account(),
      destinations: moonbaseAlpha,
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
  chain: darwiniaPangoro,
});
