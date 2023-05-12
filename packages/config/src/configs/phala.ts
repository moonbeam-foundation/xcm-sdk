import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { glmr, pha } from '../assets';
import { moonbeam, phala } from '../chains';

export const phalaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().system().account(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().here(),
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().assets().account(),
      destinations: moonbeam,
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().X2(),
      fee: {
        asset: pha,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: phala,
});
