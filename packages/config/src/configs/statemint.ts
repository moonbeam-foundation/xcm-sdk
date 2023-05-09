import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { dot, usdt } from '../assets';
import { moonbeam, statemint } from '../chains';

export const statemintConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().assets().account(),
      destinations: [moonbeam],
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
  chain: statemint,
});
