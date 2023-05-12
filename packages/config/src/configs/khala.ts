import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { movr, pha } from '../assets';
import { khala, moonriver } from '../chains';

export const khalaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().system().account(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().here(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().assets().account(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().X2(),
      fee: {
        asset: pha,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: khala,
});
