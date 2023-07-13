import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dev, eq, eqd } from '../assets';
import { equilibriumAlphanet, moonbaseAlpha } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const equilibriumAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: eq,
      },
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: eq,
      },
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      fee: {
        asset: eq,
        balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.00005,
        asset: dev,
      },
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      fee: {
        asset: eq,
        balance: BalanceBuilder().substrate().system().accountEquilibrium(),
      },
    }),
  ],
  chain: equilibriumAlphanet,
});
