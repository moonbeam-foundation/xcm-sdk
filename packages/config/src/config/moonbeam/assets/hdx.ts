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

const asset = assets[AssetSymbol.HDX];
const origin = chains[ChainKey.HydraDX];

export const HDX: MoonbeamXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset(0), // currencyId
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 150,
    }),
  },
};
