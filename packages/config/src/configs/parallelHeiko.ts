import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { hko, movr } from '../assets';
import { moonriver, parallelHeiko } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const parallelHeikoConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: hko,
      balance: BalanceBuilder().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: hko,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiAsset(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: movr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: hko,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: parallelHeiko,
});
