import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { eq, eqd, glmr } from '../assets';
import { equilibrium, moonbeam } from '../chains';
import { AssetTransferConfig } from '../types/AssetTransferConfig';
import { ChainRoutesConfig } from '../types/ChainRoutesConfig';

export const equilibriumConfig = new ChainRoutesConfig({
  assets: [
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
    new AssetTransferConfig({
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
