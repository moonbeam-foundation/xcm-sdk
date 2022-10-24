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
} from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[AssetSymbol.IBTC];
const feeAsset = assets[AssetSymbol.INTR];
const origin = chains[ChainKey.Interlay];

export const IBTC: MoonbeamXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.tokens({
        [BalanceCurrencyTypes.Token]: asset.originSymbol,
      }),
      sourceFeeBalance: balance.tokens({ Token: feeAsset.originSymbol }),
      xcmFeeAsset: {
        asset: feeAsset,
        balance: balance.tokens({ Token: feeAsset.originSymbol }),
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
      balance: balance.tokens({
        [BalanceCurrencyTypes.Token]: asset.originSymbol,
      }),
      destination: origin,
      feePerWeight: 0.00000619,
    }),
  },
};
