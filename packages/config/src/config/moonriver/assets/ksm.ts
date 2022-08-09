import { Asset, Chain } from '../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[Asset.KSM];
const origin = chains[Chain.Kusama];

export const KSM: MoonriverXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.chain]: {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xcmPallet()
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin),
    },
  },
  withdraw: {
    [origin.chain]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 0.42,
    }),
  },
};
