import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { movr, sdn } from '../assets';
import { moonriver, shiden } from '../chains';

export const shidenConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: sdn,
      balance: BalanceBuilder().system().account(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().assets().account(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      feeAsset: sdn,
      feeBalance: BalanceBuilder().system().account(),
    }),
  ],
  chain: shiden,
});
