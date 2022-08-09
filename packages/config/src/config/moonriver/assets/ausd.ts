import { Asset, Chain } from '../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[Asset.AUSD];
const origin = chains[Chain.Karura];

export const AUSD: MoonriverXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.chain]: {
      origin,
      balance: balance.tokens('KUSD'),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({
          Token: 'KUSD',
        }),
    },
  },
  withdraw: {
    [origin.chain]: withdraw.xTokens({
      balance: balance.tokens('KUSD'),
      destination: origin,
      feePerWeight: 64,
    }),
  },
};
