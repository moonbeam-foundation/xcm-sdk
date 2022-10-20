import { AssetSymbol, ChainKey } from '../../../constants';
import { XTransferExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[AssetSymbol.PHA];
const origin = chains[ChainKey.Phala];

export const PHA: MoonbeamXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
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
    [origin.key]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 80,
    }),
  },
};
