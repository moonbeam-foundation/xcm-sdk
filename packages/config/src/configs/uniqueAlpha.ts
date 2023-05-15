import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { auq } from '../assets';
import { moonbaseAlpha, uniqueAlpha } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

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
