import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { tt1, unit } from '../assets';
import { moonbaseAlpha, statemineAlphanet } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const statemineAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: tt1,
      balance: BalanceBuilder().assets().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0,
        asset: tt1,
      },
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
