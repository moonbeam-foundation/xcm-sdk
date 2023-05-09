import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
import { kbtc, kint } from '../assets';
import { kinitsugi, moonriver } from '../chains';

export const kinitsugiConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: kint,
      balance: BalanceBuilder().tokens().accounts(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: kbtc,
      balance: BalanceBuilder().tokens().accounts(),
      destinations: [moonriver],
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      feeAsset: kint,
      feeBalance: BalanceBuilder().tokens().accounts(),
    }),
  ],
  chain: kinitsugi,
});
