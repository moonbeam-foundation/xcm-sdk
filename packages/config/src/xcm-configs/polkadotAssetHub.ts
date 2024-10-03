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
      source: {
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: usdt,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: usdt,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
    },
    {
      source: {
        asset: usdc,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: usdc,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: usdc,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
    },
    {
      source: {
        asset: pink,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: pink,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
            isAssetReserveChain: false,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: usdt,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
    },
    {
      source: {
        asset: ded,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: ded,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
            isAssetReserveChain: false,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: usdt,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
    },
    {
      source: {
        asset: stink,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: stink,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: usdt,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
    },
    {
      source: {
        asset: apillon,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: apillon,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
            isAssetReserveChain: false,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: usdt,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
    },
    {
      source: {
        asset: wifd,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: wifd,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
            isAssetReserveChain: false,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: usdt,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
    },
  ],
});
