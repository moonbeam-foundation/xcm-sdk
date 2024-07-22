import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ksm, rmrk, usdt } from '../assets';
import { kusamaAssetHub, moonriver } from '../chains';
import { AssetTransferConfig } from '../types/AssetTransferConfig';
import { ChainRoutesConfig } from '../types/ChainRoutesConfig';

const extra = 0.0015;

export const kusamaAssetHubConfig = new ChainRoutesConfig({
  assets: [
    new AssetTransferConfig({
      asset: rmrk,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: rmrk,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: ksm,
        balance: BalanceBuilder().substrate().system().account(),
        extra,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetTransferConfig({
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: ksm,
        balance: BalanceBuilder().substrate().system().account(),
        extra,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
  chain: kusamaAssetHub,
});
