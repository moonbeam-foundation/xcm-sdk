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
  wethe,
  wifd,
} from '../assets';
import { moonbeam, polkadotAssetHub } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

const xcmDeliveryFeeAmount = 0.036;

export const polkadotAssetHubConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
        }),
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().polkadotXcm().trasferAssets().here(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
    }),
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: usdc,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
        asset: usdc,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: pink,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
          shouldTransferAssetPrecedeAsset: true,
        }),
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: ded,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
          shouldTransferAssetPrecedeAsset: true,
        }),
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: stink,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: wifd,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
          shouldTransferAssetPrecedeAsset: true,
        }),
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: apillon,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
          shouldTransferAssetPrecedeAsset: true,
        }),
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: wethe,
      balance: BalanceBuilder().substrate().foreignAssets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
        }),
        asset: wethe,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .globalConcensusEthereum(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().foreignAssets().asset(),
    }),
  ],
  chain: polkadotAssetHub,
});
