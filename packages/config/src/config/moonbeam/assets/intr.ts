import { AssetSymbol, ChainKey } from '../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[AssetSymbol.INTR];
const origin = chains[ChainKey.Interlay];

export const INTR: MoonbeamXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      origin,
      balance: balance.tokens(asset.originSymbol),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({ Token: asset.originSymbol }),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.tokens(asset.originSymbol),
      destination: origin,
      feePerWeight: 1.87,
    }),
  },
};
