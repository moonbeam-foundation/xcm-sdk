import { Asset, Chain } from '../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[Asset.KBTC];
const feeAsset = assets[Asset.KINT];
const origin = chains[Chain.InterBTCAlphanet];

export const KBTC: MoonbaseXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.chain]: {
      origin,
      balance: balance.tokens(asset.originSymbol),
      sourceFeeBalance: balance.tokens(feeAsset.originSymbol),
      isNativeAssetPayingMoonFee: true,
      extrinsic: extrinsic
        .xTokens()
        .transferMultiCurrencies()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiCurrencies)
        .origin(origin)
        .assets(asset, feeAsset),
    },
  },
  withdraw: {
    [origin.chain]: withdraw.xTokens({
      balance: balance.tokens(asset.originSymbol),
      destination: origin,
      feePerWeight: 0.00001,
    }),
  },
};
