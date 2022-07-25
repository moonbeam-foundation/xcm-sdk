import { Asset, Chain } from '../../../../constants';
import { XTransferExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonbaseAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';

const asset = assets[Asset.PHA];
const origin = chains[Chain.KhalaAlphanet];

export const PHA: XcmConfig<MoonbaseAssets> = {
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
