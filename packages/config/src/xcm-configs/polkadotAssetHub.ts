import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import {
  apillon,
  ded,
  dot,
  pink,
  stink,
  usdc,
  usdt,
  wbtce,
  wethe,
  wifd,
  wstethe,
} from '../assets';
import { moonbeam, polkadotAssetHub } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

const extra = 0.036;

export const polkadotAssetHubRoutes = new ChainRoutes({
  chain: polkadotAssetHub,
  routes: [
    {
      source: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: dot,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: dot,
        },
      },
      extrinsic: ExtrinsicBuilder().polkadotXcm().transferAssets().here(),
    },
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
          }),
          asset: dot,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssets()
        .X2AndFeeHere(),
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
          }),
          asset: dot,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssets()
        .X2AndFeeHere(),
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
          asset: dot,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssets()
        .X2AndFeeHere(),
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
          }),
          asset: dot,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssets()
        .X2AndFeeHere(),
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
          }),
          asset: dot,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssets()
        .X2AndFeeHere(),
    },
    {
      source: {
        asset: wbtce,
        balance: BalanceBuilder().substrate().foreignAssets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().foreignAssets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().foreignAssets().account(),
        },
      },
      destination: {
        asset: wbtce,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
            isAssetReserveChain: false,
          }),
          asset: wbtce,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .globalConsensusEthereum(),
    },
    {
      source: {
        asset: wethe,
        balance: BalanceBuilder().substrate().foreignAssets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().foreignAssets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().foreignAssets().account(),
        },
      },
      destination: {
        asset: wethe,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
            isAssetReserveChain: false,
          }),
          asset: wethe,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .globalConsensusEthereum(),
    },
    {
      source: {
        asset: wstethe,
        balance: BalanceBuilder().substrate().foreignAssets().account(),
        fee: {
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().foreignAssets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().foreignAssets().account(),
        },
      },
      destination: {
        asset: wstethe,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
            isAssetReserveChain: false,
          }),
          asset: wstethe,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .globalConsensusEthereum(),
    },
  ],
});
