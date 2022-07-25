import { Asset, Chain } from '../../../../constants';
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

const asset = assets[Asset.AUSD];
const origin = chains[Chain.Karura];

export const AUSD: XcmConfig<MoonriverAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.tokens('KUSD'),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({
          Token: 'KUSD',
        }),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.tokens('KUSD'),
      destination: origin,
      existentialDeposit: 10_000_000_000,
      feePerWeight: 64,
    }),
  ],
};
