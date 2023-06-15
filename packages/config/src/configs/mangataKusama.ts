import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { mgx, movr } from '../assets';
import { mangataKusama, moonriver } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const mangataKusamaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: mgx,
      balance: BalanceBuilder().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: mgx,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: 0.0001, // TODO
        asset: movr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: mgx,
        balance: BalanceBuilder().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    }),
  ],
  chain: mangataKusama,
});
