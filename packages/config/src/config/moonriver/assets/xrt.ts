import { AssetSymbol, ChainKey } from '../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[AssetSymbol.XRT];
const origin = chains[ChainKey.Robonomics];

export const XRT: MoonriverXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin)
        .V1()
        .here(),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 0.000008,
    }),
  },
};
