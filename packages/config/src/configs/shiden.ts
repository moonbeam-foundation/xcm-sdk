import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { movr, sdn } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { moonriver, shiden } from '../xcmChains';

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
        .xTokens()
        .transferMultiAsset(shiden.parachainId)
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
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: sdn,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: shiden,
});
