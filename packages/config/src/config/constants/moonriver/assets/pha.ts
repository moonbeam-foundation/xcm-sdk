import { Assets, Chain } from '../../../../constants';
import { XTransferExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonriverAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonriver.common';

const asset = assets[Assets.PHA];
const origin = chains[Chain.Khala];

export const PHA: XcmConfig<MoonriverAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTransfer()
        .transfer()
        .successEvent(XTransferExtrinsicSuccessEvent.Deposited)
        .origin(origin)
        .here(),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 80,
      existentialDeposit: 10_000_000_000,
    }),
  ],
};
