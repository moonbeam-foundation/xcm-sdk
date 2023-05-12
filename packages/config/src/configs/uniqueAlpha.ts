import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { auq } from '../assets';
import { moonbaseAlpha, uniqueAlpha } from '../chains';

export const uniqueAlphaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: auq,
      balance: BalanceBuilder().assets().account(),
      destinations: moonbaseAlpha,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
  chain: uniqueAlpha,
});
