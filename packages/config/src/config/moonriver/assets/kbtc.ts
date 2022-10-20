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
      balance: balance.tokens({ Token: asset.originSymbol }),
      sourceFeeBalance: balance.tokens({ Token: feeAsset.originSymbol }),
      xcmFeeAsset: {
        asset: feeAsset,
        balsance: balance.tokens({ Token: feeAsset.originSymbol }),
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
      balance: balance.tokens({ Token: asset.originSymbol }),
      destination: origin,
      feePerWeight: 0.000000107,
    }),
  },
};
