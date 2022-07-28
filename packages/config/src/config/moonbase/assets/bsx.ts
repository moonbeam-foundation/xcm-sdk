import { Asset, Chain } from '../../../constants';
import { getOriginAssetId } from '../../config.utils';
import { XTokensExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[Asset.BSX];
const origin = chains[Chain.BasiliskAlphanet];
const originAssetId = getOriginAssetId(asset);

export const BSX: MoonbaseXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.chain]: {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
        .origin(origin)
        .asset(originAssetId),
    },
  },
  withdraw: {
    [origin.chain]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 1,
    }),
  },
};
