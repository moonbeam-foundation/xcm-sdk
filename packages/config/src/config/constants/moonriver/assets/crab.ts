import { Asset, Chain } from '../../../../constants';
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

const asset = assets[Asset.CRAB];
const origin = chains[Chain.Darwinia];

export const CRAB: XcmConfig<MoonriverAssets> = {
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
        .X1(),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 8,
    }),
  ],
};
