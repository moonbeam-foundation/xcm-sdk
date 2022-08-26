import { Asset, Chain } from '../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[Asset.IBTC];
const feeAsset = assets[Asset.INTR];
const origin = chains[Chain.Interley];

export const IBTC: MoonbeamXcmConfig = <const>{
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
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .assets(asset, feeAsset),
    },
  },
  withdraw: {
    [origin.chain]: withdraw.xTokens({
      balance: balance.tokens(asset.originSymbol),
      destination: origin,
      feePerWeight: 0.00000619,
    }),
  },
};
