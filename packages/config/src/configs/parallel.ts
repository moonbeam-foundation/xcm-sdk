import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, para } from '../assets';
import { moonbeam, parallel } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const parallelConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: para,
      balance: BalanceBuilder().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: para,
      },
      extrinsic: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(parallel.parachainId),
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: para,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: parallel,
});
