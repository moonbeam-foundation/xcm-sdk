import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ksm } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { kusama, moonriver } from '../xcmChains';

export const kusamaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: ksm,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: ksm,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .limitedReserveTransferAssets(0)
        .here(),
      fee: {
        asset: ksm,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount: 0.002,
      },
    }),
  ],
  chain: kusama,
});
