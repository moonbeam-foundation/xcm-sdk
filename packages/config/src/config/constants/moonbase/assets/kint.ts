import { Asset, Chain } from '../../../../constants';
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

const asset = assets[Asset.KINT];
const origin = chains[Chain.InterBTCAlphanet];

export const KINT: XcmConfig<MoonbaseAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.tokens(asset.originSymbol),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
        .origin(origin)
        .asset({ Token: asset.originSymbol }),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.tokens(asset.originSymbol),
      destination: origin,
      feePerWeight: 8,
    }),
  ],
};
