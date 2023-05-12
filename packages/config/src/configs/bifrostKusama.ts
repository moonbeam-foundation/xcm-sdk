import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { bnc, movr } from '../assets';
import { bifrostKusama, moonriver } from '../chains';

export const bifrostKusamaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().system().account(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().tokens().accounts(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: bnc,
        balance: BalanceBuilder().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    }),
  ],
  chain: bifrostKusama,
});
