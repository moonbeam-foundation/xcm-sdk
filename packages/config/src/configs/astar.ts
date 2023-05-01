import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { astr, glmr } from '../assets';
import { astar, moonbeam } from '../chains';

export const astarConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: astr,
      balance: BalanceBuilder().system().account(),
      destinations: [moonbeam],
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().assets().account(),
      destinations: [moonbeam],
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      feeAsset: astr,
      feeBalance: BalanceBuilder().system().account(),
    }),
  ],
  chain: astar,
});
