import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { aca, aseed, glmr } from '../assets';
import { acala, moonbeam } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const acalaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: aca,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: aca,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: aseed,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: aseed,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: aca,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: aca,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    }),
  ],
  chain: acala,
});
