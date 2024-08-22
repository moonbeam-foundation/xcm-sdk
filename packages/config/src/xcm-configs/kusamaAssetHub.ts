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
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: rmrk,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
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
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
    },
  ],
});
