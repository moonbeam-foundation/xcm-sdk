import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { lit } from '../assets';
import { litentryAlphanet, moonbaseAlpha } from '../chains';

export const litentryAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: lit,
      balance: BalanceBuilder().system().account(),
      destinations: moonbaseAlpha,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
  chain: litentryAlphanet,
});
