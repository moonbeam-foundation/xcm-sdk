import { Asset, Chain, DEV_ID } from '../../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonbaseAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';

const asset = assets[Asset.BSX];
const origin = chains[Chain.BasiliskAlphanet];
const basiliskDevId = DEV_ID[Chain.BasiliskAlphanet];

export const BSX: XcmConfig<MoonbaseAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
        .origin(origin)
        .asset(basiliskDevId),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 1,
    }),
  ],
};
