import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ksm, rmrk, usdt } from '../assets';
import { kusamaAssetHub, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

const extra = 0.0015;

export const kusamaAssetHubRoutes = new ChainRoutes({
  chain: kusamaAssetHub,
  routes: [
    {
      asset: rmrk,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: ksm,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: rmrk,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: usdt,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: ksm,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      min: AssetMinBuilder().assets().asset(),
    },
  ],
});
