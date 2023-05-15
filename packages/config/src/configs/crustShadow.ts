import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { csm, movr } from '../assets';
import { crustShadow, moonriver } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const crustShadowConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: csm,
      balance: BalanceBuilder().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: 0,
        asset: csm,
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: 0,
        asset: movr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: csm,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: crustShadow,
});
