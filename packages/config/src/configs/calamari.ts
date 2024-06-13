import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { kma, movr } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { calamari, moonriver } from '../xcmChains';

export const calamariConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: kma,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: kma,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: 0.0001,
        asset: movr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: kma,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
  chain: calamari,
});
