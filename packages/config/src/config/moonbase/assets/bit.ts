import { AssetSymbol, ChainKey } from '../../../constants';
import {
  XTokensExtrinsicCurrencyTypes,
  XTokensExtrinsicSuccessEvent,
} from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[AssetSymbol.BIT];
const origin = chains[ChainKey.BitCountryPioneer];

export const BIT: MoonbaseXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      origin,
      balance: balance.tokens({ MiningResource: 0 }),
      sourceFeeBalance: balance.system(),
      isNativeAssetPayingMoonFee: true,
      extrinsic: extrinsic
        .xTokens()
        .transferMultiCurrencies()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .assets(
          {
            [XTokensExtrinsicCurrencyTypes.MiningResource]: 0,
          },
          {
            [XTokensExtrinsicCurrencyTypes.NativeToken]: 0,
          },
        ),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.tokens({ MiningResource: 0 }),
      destination: origin,
      feePerWeight: 800_000,
    }),
  },
};
