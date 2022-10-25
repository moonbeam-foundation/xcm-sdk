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
} from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[AssetSymbol.AUSD];
const origin = chains[ChainKey.Karura];

export const AUSD: MoonriverXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.tokens().token(AssetSymbol.KUSD),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({
          [XTokensExtrinsicCurrencyTypes.Token]: AssetSymbol.KUSD,
        }),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.tokens().token(AssetSymbol.KUSD),
      destination: origin,
      feePerWeight: 64,
    }),
  },
};
