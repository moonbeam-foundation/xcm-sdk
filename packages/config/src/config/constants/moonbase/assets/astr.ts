import { Asset, Chain } from '../../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonbaseAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';

const asset = assets[Asset.ASTR];
const origin = chains[Chain.AstarAlphanet];

export const ASTR: XcmConfig<MoonbaseAssets> = {
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
        .V1()
        .here(),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 8_000_000,
      existentialDeposit: 1_000_000,
    }),
  ],
};
