import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { ksm } from '../assets';
import { kusama, moonriver } from '../chains';

export const kusamaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: ksm,
      balance: BalanceBuilder().system().account(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .limitedReserveTransferAssets()
        .here(),
    }),
  ],
  chain: kusama,
});
