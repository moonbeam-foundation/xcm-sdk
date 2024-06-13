import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { tnkr } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { moonriver, tinkernet } from '../xcmChains';

export const tinkernetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: tnkr,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: tnkr,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
  chain: tinkernet,
});
