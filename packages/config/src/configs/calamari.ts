import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { kma, movr } from '../assets';
import { calamari, moonriver } from '../chains';

export const calamariConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: kma,
      balance: BalanceBuilder().system().account(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().assets().account(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: kma,
        balance: BalanceBuilder().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
  chain: calamari,
});
