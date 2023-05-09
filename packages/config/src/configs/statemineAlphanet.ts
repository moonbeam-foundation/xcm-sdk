import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { tt1, unit } from '../assets';
import { moonbaseAlpha, statemineAlphanet } from '../chains';

export const statemineAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: tt1,
      balance: BalanceBuilder().assets().account(),
      destinations: [moonbaseAlpha],
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: unit,
        balance: BalanceBuilder().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
  chain: statemineAlphanet,
});
