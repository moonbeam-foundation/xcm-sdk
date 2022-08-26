import { Asset, Chain } from '../../../constants';
import { XTransferExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[Asset.PHA];
const origin = chains[Chain.Phala];

export const PHA: MoonbeamXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.chain]: {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTransfer()
        .transfer()
        .successEvent(XTransferExtrinsicSuccessEvent.Deposited)
        .origin(origin)
        .here(),
    },
  },
  withdraw: {
    [origin.chain]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 80,
    }),
  },
};
