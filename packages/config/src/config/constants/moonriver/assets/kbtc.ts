import { Asset, Chain } from '../../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonriverAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonriver.common';

const asset = assets[Asset.KBTC];
const feeAsset = assets[Asset.KINT];
const origin = chains[Chain.Kintsugi];

export const KBTC: XcmConfig<MoonriverAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.tokens(asset.originSymbol),
      extrinsicFeeBalance: balance.tokens(feeAsset.originSymbol),
      xcmFeeAsset: feeAsset,
      extrinsic: extrinsic
        .xTokens()
        .transferMultiCurrencies()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .assets(asset, feeAsset),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.tokens(asset.originSymbol),
      destination: origin,
      feePerWeight: 0.000000107,
    }),
  ],
};
