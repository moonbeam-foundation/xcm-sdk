import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { sub } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { moonbeam, subsocial } from '../xcmChains';

export const subsocialConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: sub,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: sub,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    }),
  ],
  chain: subsocial,
});
