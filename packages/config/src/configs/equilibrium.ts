import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { eq, eqd, glmr } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { equilibrium, moonbeam } from '../xcmChains';

export const equilibriumConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: eq,
        balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      },
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: eq,
        balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      },
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      fee: {
        asset: eq,
        balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      },
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      fee: {
        asset: eq,
        balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      },
    }),
  ],
  chain: equilibrium,
});
