import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { hko, movr } from '../assets';
import { moonriver, parallelHeiko } from '../chains';

export const parallelHeikoConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: hko,
      balance: BalanceBuilder().system().account(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiAsset(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().assets().account(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      feeAsset: hko,
      feeBalance: BalanceBuilder().system().account(),
    }),
  ],
  chain: parallelHeiko,
});
