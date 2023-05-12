import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { ring } from '../assets';
import { darwinia, moonbeam } from '../chains';

export const darwiniaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: ring,
      balance: BalanceBuilder().system().account(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
  chain: darwinia,
});
