import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { kbtc, kint } from '../assets';
import { kintsugi, moonriver } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const kintsugiConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: kint,
      balance: BalanceBuilder().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: kint,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: kbtc,
      balance: BalanceBuilder().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: kint,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: kint,
        balance: BalanceBuilder().tokens().accounts(),
      },
    }),
  ],
  chain: kintsugi,
});
