import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { dev, eq, eqd } from '../assets';
import { equilibriumAlphanet, moonbaseAlpha } from '../chains';

export const equilibriumAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().system().accountEquilibrium(),
      destinations: moonbaseAlpha,
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().system().accountEquilibrium(),
      destinations: moonbaseAlpha,
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      fee: {
        asset: eq,
        balance: BalanceBuilder().system().accountEquilibrium(),
      },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().system().accountEquilibrium(),
      destinations: moonbaseAlpha,
      extrinsic: ExtrinsicBuilder().eqBalances().transferXcm(),
      fee: {
        asset: eq,
        balance: BalanceBuilder().system().accountEquilibrium(),
      },
    }),
  ],
  chain: equilibriumAlphanet,
});
