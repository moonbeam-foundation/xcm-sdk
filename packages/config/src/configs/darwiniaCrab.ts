import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { crab } from '../assets';
import { darwiniaCrab, moonriver } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const darwiniaCrabConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: crab,
      balance: BalanceBuilder().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: 0,
        asset: crab,
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
  chain: darwiniaCrab,
});
