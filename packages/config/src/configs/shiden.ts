import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { movr, sdn } from '../assets';
import { moonriver, shiden } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const shidenConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: sdn,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: sdn,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: 0.0001,
        asset: movr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveWithdrawAssets()
        .X2(),
      fee: {
        asset: sdn,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: shiden,
});
