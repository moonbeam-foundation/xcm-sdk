import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { neuro } from '../assets';
import { moonbeam, neuroweb } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const neurowebConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: neuro,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: neuro,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
  chain: neuroweb,
});
