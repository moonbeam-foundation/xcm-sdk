import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { kbtc, kint } from '../assets';
import { kinitsugi, moonriver } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const kinitsugiConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: kint,
      balance: BalanceBuilder().tokens().accounts(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: kbtc,
      balance: BalanceBuilder().tokens().accounts(),
      destinations: moonriver,
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: kint,
        balance: BalanceBuilder().tokens().accounts(),
      },
    }),
  ],
  chain: kinitsugi,
});
