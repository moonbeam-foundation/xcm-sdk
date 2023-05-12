import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { crab } from '../assets';
import { darwiniaCrab, moonriver } from '../chains';

export const darwiniaCrabConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: crab,
      balance: BalanceBuilder().system().account(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
  chain: darwiniaCrab,
});
