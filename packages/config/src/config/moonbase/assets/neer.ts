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

const asset = assets[AssetSymbol.NEER];
const origin = chains[ChainKey.BitCountryPioneer];

export const NEER: MoonbaseXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({ [XTokensExtrinsicCurrencyTypes.NativeToken]: 0 }),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 8_000_000,
    }),
  },
};
