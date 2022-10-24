import { BalanceCurrencyTypes } from '../../../balance';
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
const feeAsset = assets[AssetSymbol.NEER];
const origin = chains[ChainKey.BitCountryPioneer];

export const BIT: MoonbaseXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.tokens({ [BalanceCurrencyTypes.MiningResource]: 0 }),
      sourceFeeBalance: balance.system(),
      xcmFeeAsset: {
        asset: feeAsset,
        balance: balance.system(),
      },
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
