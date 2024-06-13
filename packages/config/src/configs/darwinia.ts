import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ring } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { darwinia, moonbeam } from '../xcmChains';

export const darwiniaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: ring,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: ring,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    }),
  ],
  chain: darwinia,
});
