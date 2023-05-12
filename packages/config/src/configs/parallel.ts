import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { glmr, para } from '../assets';
import { moonbeam, parallel } from '../chains';

export const parallelConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: para,
      balance: BalanceBuilder().system().account(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiAsset(),
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().assets().account(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: para,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: parallel,
});
