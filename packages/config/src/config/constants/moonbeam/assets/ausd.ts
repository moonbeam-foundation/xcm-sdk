import { Assets, Chain } from '../../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonbeamAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbeam.common';

const asset = assets[Assets.AUSD];
const origin = chains[Chain.Acala];

export const AUSD: XcmConfig<MoonbeamAssets> = {
  asset,
  origin,
  deposit: [
    {
      origin,
      balance: balance.tokens(asset.originSymbol),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({
          Token: asset.originSymbol,
        }),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.tokens(asset.originSymbol),
      destination: origin,
      existentialDeposit: 100_000_000_000,
      feePerWeight: 64,
    }),
  ],
};
