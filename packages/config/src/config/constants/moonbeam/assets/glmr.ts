import { Assets, Chain } from '../../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonbeamAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  moonbeam,
  extrinsic,
  withdraw,
} from '../moonbeam.common';

const asset = assets[Assets.GLMR];
const origin = moonbeam;

export const GLMR: XcmConfig<MoonbeamAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin: chains[Chain.Acala],
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
      existentialDeposit: 10_000_000_000,
      feePerWeight: 0.13,
    }),
  ],
};
