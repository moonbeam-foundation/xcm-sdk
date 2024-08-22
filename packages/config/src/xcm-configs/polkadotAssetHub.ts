import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { apillon, ded, dot, pink, stink, usdc, usdt, wifd } from '../assets';
import { moonbeam, polkadotAssetHub } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

const extra = 0.036;

export const polkadotAssetHubRoutes = new ChainRoutes({
  chain: polkadotAssetHub,
  routes: [
    {
      asset: usdt,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
      },
      destination: {
        chain: moonbeam,
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
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: usdc,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.03,
          asset: usdc,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: pink,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.03,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: ded,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.03,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: stink,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.03,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: apillon,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.03,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      min: AssetMinBuilder().assets().asset(),
    },
    {
      asset: wifd,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.03,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      min: AssetMinBuilder().assets().asset(),
    },
  ],
});
