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

const asset = assets[Assets.CSM];
const origin = chains[Chain.CrustShadow];

export const CSM: XcmConfig<MoonriverAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin)
        .V0(),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 1,
      existentialDeposit: 100_000_000_000,
    }),
  ],
};
