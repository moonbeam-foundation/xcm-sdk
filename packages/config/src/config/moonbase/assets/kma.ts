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

const asset = assets[Asset.KMA];
const origin = chains[Chain.CalamariAlphanet];

export const KMA: MoonbaseXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.chain]: {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({ MantaCurrency: 1 }),
    },
  },
  withdraw: {
    [origin.chain]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 0.001,
    }),
  },
};
