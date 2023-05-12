import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { lit } from '../assets';
import { litmus, moonriver } from '../chains';

export const litmusConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: lit,
      balance: BalanceBuilder().system().account(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
  chain: litmus,
});
