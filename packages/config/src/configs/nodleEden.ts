import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { nodl } from '../assets';
import { moonbaseAlpha, nodleEden } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const nodleEdenConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: nodl,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: nodl,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
  chain: nodleEden,
});
