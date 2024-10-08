import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ksm, rmrk, usdt } from '../assets';
import { kusamaAssetHub, moonriver } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

const xcmDeliveryFeeAmount = 0.0015;

export const kusamaAssetHubConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: rmrk,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
        }),
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
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
        }),
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
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: ksm,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
        }),
        asset: ksm,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().polkadotXcm().trasferAssets().here(),
      fee: {
        asset: ksm,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
    }),
  ],
  chain: kusamaAssetHub,
});
