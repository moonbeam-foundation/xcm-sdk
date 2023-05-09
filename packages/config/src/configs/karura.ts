import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { ausd, kar, movr } from '../assets';
import { karura, moonriver } from '../chains';

export const karuraConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: kar,
      balance: BalanceBuilder().system().account(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: ausd,
      balance: BalanceBuilder().tokens().accounts(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: kar,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().assets().account(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: kar,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: karura,
});
