import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { aca, ausd, glmr } from '../assets';
import { acala, moonbeam } from '../chains';

export const acalaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: aca,
      balance: BalanceBuilder().system().account(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: ausd,
      balance: BalanceBuilder().tokens().accounts(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: aca,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().assets().account(),
      destinations: moonbeam,
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
