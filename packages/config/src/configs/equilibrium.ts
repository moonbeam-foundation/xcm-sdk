import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { eq, eqd, glmr } from '../assets';
import { equilibrium, moonbeam } from '../chains';

export const equilibriumConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().system().accountEquilibrium(),
      destinations: [moonbeam],
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().system().accountEquilibrium(),
      destinations: [moonbeam],
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      feeAsset: eq,
      feeBalance: BalanceBuilder().system().accountEquilibrium(),
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().accountEquilibrium(),
      destinations: [moonbeam],
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      feeAsset: eq,
      feeBalance: BalanceBuilder().system().accountEquilibrium(),
    }),
  ],
  chain: equilibrium,
});
