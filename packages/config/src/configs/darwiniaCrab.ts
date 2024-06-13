import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { crab } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { darwiniaCrab, moonriver } from '../xcmChains';

export const darwiniaCrabConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: crab,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: crab,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
  chain: darwiniaCrab,
});
