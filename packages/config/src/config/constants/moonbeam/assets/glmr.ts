import { Assets, Chain, GLMR_ID } from '../../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../../extrinsic';
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
const acala = chains[Chain.Acala];
const parallel = chains[Chain.Parallel];
const acalaGlmrId = GLMR_ID[Chain.Acala];
const parallelGlmrId = GLMR_ID[Chain.Parallel];

export const GLMR: XcmConfig<MoonbeamAssets> = {
  asset,
  origin: moonbeam,
  deposit: [
    {
      origin: acala,
      balance: balance.tokens(acalaGlmrId),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(acala)
        .asset({
          ForeignAsset: acalaGlmrId,
        }),
    },
    {
      origin: parallel,
      balance: balance.assets(parallelGlmrId),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(parallel)
        .asset(parallelGlmrId),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.tokens(acalaGlmrId),
      destination: acala,
      existentialDeposit: 100_000_000_000_000_000,
      feePerWeight: 8_000_000,
    }),
    withdraw.xTokens({
      balance: balance.assets(parallelGlmrId),
      destination: parallel,
      feePerWeight: 8,
    }),
  ],
};
