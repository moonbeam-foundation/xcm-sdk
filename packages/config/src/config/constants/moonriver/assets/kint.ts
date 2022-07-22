import { Assets, Chain } from '../../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonriverAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonriver.common';

const asset = assets[Assets.KINT];
const origin = chains[Chain.Kintsugi];

export const KINT: XcmConfig<MoonriverAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.tokens(asset.originSymbol),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({ Token: asset.originSymbol }),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.tokens(asset.originSymbol),
      destination: origin,
      feePerWeight: 0.21,
    }),
  ],
};
