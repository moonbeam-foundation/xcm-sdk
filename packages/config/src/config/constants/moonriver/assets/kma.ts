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

const asset = assets[Assets.KMA];
const origin = chains[Chain.Calamari];

export const KMA: XcmConfig<MoonriverAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
        .origin(origin)
        .asset({ MantaCurrency: 1 }),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 0.001,
      existentialDeposit: 100_000_000_000,
    }),
  ],
};
