import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { csm, movr } from '../assets';
import { crustShadow, moonriver } from '../chains';

export const crustShadowConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: csm,
      balance: BalanceBuilder().system().account(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().assets().account(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: csm,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: crustShadow,
});
