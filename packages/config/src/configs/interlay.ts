import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ibtc, intr } from '../assets';
import { interlay, moonbeam } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const interlayConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: intr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: intr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: ibtc,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: intr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: intr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
    }),
  ],
  chain: interlay,
});
