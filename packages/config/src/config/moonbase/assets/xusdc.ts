import { AssetSymbol, ChainKey } from '../../../constants';
import {
  XTokensExtrinsicCurrencyTypes,
  XTokensExtrinsicSuccessEvent,
} from '../../../extrinsic';
import { getForeignAssetId, getOriginAssetId } from '../../config.utils';
import {
  assets,
  balance,
  chains,
  extrinsic,
  moonbase,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[AssetSymbol.XUSDC];
const xcmFeeAsset = assets[AssetSymbol.DEV];
const centrifuge = chains[ChainKey.CentrifugeAlphanet];
const originAssetId = getOriginAssetId(asset);
const xcmFeeAssetId = getForeignAssetId(
  xcmFeeAsset,
  ChainKey.CentrifugeAlphanet,
);

export const XUSDC: MoonbaseXcmConfig = {
  asset,
  origin: moonbase,
  deposit: {
    [centrifuge.key]: {
      origin: centrifuge,
      balance: balance.ormlTokens(originAssetId),
      sourceFeeBalance: balance.system(),
      xcmFeeAsset: {
        asset: xcmFeeAsset,
        balance: balance.ormlTokens(xcmFeeAssetId),
      },
      extrinsic: extrinsic
        .xTokens()
        .transferMultiCurrencies()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(centrifuge)
        .assets(
          {
            [XTokensExtrinsicCurrencyTypes.ForeignAsset]: originAssetId,
          },
          {
            [XTokensExtrinsicCurrencyTypes.ForeignAsset]: xcmFeeAssetId,
          },
        ),
    },
  },
  withdraw: {
    [centrifuge.key]: withdraw.xTokens({
      balance: balance.ormlTokens(originAssetId),
      sourceMinBalance: balance.min(originAssetId),
      destination: centrifuge,
      feePerWeight: 1_265_000,
    }),
  },
};
