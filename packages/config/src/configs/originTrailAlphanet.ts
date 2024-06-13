import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { otp } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { moonbaseAlpha, originTrailAlphanet } from '../xcmChains';

export const originTrailAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: otp,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: otp,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
  chain: originTrailAlphanet,
});
