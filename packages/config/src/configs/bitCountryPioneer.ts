import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { dev, neer } from '../assets';
import { bitCountryPioneer, moonbaseAlpha } from '../chains';

export const bitCountryPioneerConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: neer,
      balance: BalanceBuilder().system().account(),
      destinations: [moonbaseAlpha],
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().tokens().accounts(),
      destinations: [moonbaseAlpha],
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      feeAsset: neer,
      feeBalance: BalanceBuilder().system().account(),
    }),
  ],
  chain: bitCountryPioneer,
});
