import { Assets, Chain } from '../../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonriverAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonriver.common';

const asset = assets[Assets.KSM];
const origin = chains[Chain.Kusama];

export const KSM: XcmConfig<MoonriverAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xcmPallet()
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      existentialDeposit: 33_333_333,
      feePerWeight: 0.42,
    }),
  ],
};
