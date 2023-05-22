import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { aca, ausd, glmr } from '../assets';
import { acala, moonbeam } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const acalaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: aca,
      balance: BalanceBuilder().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: aca,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: ausd,
      balance: BalanceBuilder().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: aca,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: aca,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: glmr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: aca,
        balance: BalanceBuilder().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    }),
  ],
  chain: acala,
});
