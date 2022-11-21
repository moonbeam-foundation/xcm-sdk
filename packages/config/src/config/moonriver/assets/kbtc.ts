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

const asset = assets[AssetSymbol.KBTC];
const feeAsset = assets[AssetSymbol.KINT];
const origin = chains[ChainKey.Kintsugi];

export const KBTC: MoonriverXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.tokens().token(asset.originSymbol),
      sourceFeeBalance: balance.tokens().token(feeAsset.originSymbol),
      xcmFeeAsset: {
        asset: feeAsset,
        balance: balance.tokens().token(feeAsset.originSymbol),
      },
      extrinsic: extrinsic
        .xTokens()
        .transferMultiCurrencies()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
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
      balance: balance.tokens().token(asset.originSymbol),
      destination: origin,
      feePerWeight: 0.000000107,
    }),
  },
};
