import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { lit } from '../assets';
import { litentryAlphanet, moonbaseAlpha } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

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
