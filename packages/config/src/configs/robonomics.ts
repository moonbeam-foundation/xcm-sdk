import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { xrt } from '../assets';
import { moonriver, robonomics } from '../chains';
import { AssetTransferConfig } from '../types/AssetTransferConfig';
import { ChainRoutesConfig } from '../types/ChainRoutesConfig';

export const robonomicsConfig = new ChainRoutesConfig({
  assets: [
    new AssetTransferConfig({
      asset: xrt,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: xrt,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    }),
  ],
  chain: robonomics,
});
