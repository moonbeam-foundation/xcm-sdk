import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dot } from '../assets';
import { moonbeam, polkadot } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const polkadotConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .xcmPallet()
        .transferAssetsUsingTypeAndThen()
        .here(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount: 0.047,
      },
    }),
  ],
  chain: polkadot,
});
