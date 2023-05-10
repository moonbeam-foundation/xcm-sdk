import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { xrt } from '../assets';
import { moonriver, robonomics } from '../chains';

export const robonomicsConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: xrt,
      balance: BalanceBuilder().system().account(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    }),
  ],
  chain: robonomics,
});
