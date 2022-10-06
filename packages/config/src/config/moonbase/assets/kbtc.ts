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

const asset = assets[AssetSymbol.KBTC];
const feeAsset = assets[AssetSymbol.KINT];
const origin = chains[ChainKey.InterBTCAlphanet];

export const KBTC: MoonbaseXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      origin,
      balance: balance.tokens(asset.originSymbol),
      sourceFeeBalance: balance.tokens(feeAsset.originSymbol),
      xcmFeeAsset: {
        asset: feeAsset,
        balance: balance.tokens(feeAsset.originSymbol),
      },
      extrinsic: extrinsic
        .xTokens()
        .transferMultiCurrencies()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiCurrencies)
        .origin(origin)
        .assets(
          {
            [XTokensExtrinsicCurrencyTypes.Token]: asset.originSymbol,
          },
          {
            [XTokensExtrinsicCurrencyTypes.Token]: feeAsset.originSymbol,
          },
        ),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.tokens(asset.originSymbol),
      destination: origin,
      feePerWeight: 0.00001,
    }),
  },
};
