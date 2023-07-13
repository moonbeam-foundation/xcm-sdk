import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { tt1, unit } from '../assets';
import { alphanetAssetHub, moonbaseAlpha } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const alphanetAssetHubConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: tt1,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: tt1,
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: unit,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
  chain: alphanetAssetHub,
});
