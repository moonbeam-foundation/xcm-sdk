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

const asset = assets[Assets.KAR];
const origin = chains[Chain.Karura];

export const KAR: XcmConfig<MoonriverAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({
          Token: asset.originSymbol,
        }),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 8,
      existentialDeposit: 100_000_000_000,
    }),
  ],
};
