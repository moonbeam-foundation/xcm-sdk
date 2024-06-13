import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { aseed, kar, movr } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { karura, moonriver } from '../xcmChains';

export const karuraConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: kar,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: kar,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: aseed,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: aseed,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: kar,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: 0.0001,
        asset: movr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: kar,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    }),
  ],
  chain: karura,
});
