import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
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
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: auq,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
  chain: uniqueAlpha,
});
