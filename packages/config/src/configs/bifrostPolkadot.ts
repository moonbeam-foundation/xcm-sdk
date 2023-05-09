import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { bnc, glmr } from '../assets';
import { bifrostPolkadot, moonbeam } from '../chains';

export const bifrostPolkadotConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().system().account(),
      destinations: [moonbeam],
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().tokens().accounts(),
      destinations: [moonbeam],
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      feeAsset: bnc,
      feeBalance: BalanceBuilder().system().account(),
    }),
  ],
  chain: bifrostPolkadot,
});
