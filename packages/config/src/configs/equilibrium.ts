import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { eq, eqd, glmr } from '../assets';
import { equilibrium, moonbeam } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const equilibriumConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().system().accountEquilibrium(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().system().accountEquilibrium(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      fee: {
        asset: eq,
        balance: BalanceBuilder().system().accountEquilibrium(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().accountEquilibrium(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      fee: {
        asset: eq,
        balance: BalanceBuilder().system().accountEquilibrium(),
      },
    }),
  ],
  chain: equilibrium,
});
