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

const asset = assets[AssetSymbol.PARA];
const origin = chains[ChainKey.Parallel];

export const PARA: MoonbeamXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transferMultiAsset()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset(asset),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 16,
    }),
  },
};
