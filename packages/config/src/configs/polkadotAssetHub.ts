import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dot, usdt } from '../assets';
import { moonbeam, polkadotAssetHub } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const polkadotAssetHubConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: usdt,
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
  chain: polkadotAssetHub,
});
