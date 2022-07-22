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

const asset = assets[Assets.BNC];
const origin = chains[Chain.Bifrost];

export const BNC: XcmConfig<MoonriverAssets> = {
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
          Native: asset.originSymbol,
        }),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      existentialDeposit: 10_000_000_000,
      feePerWeight: 6.4,
    }),
  ],
};
