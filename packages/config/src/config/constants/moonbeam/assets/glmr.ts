import { Asset, Chain, GLMR_ID } from '../../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../../extrinsic';
import {
  assets,
  balance,
  chains,
  moonbeam,
  extrinsic,
  withdraw,
} from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[Asset.GLMR];
const acala = chains[Chain.Acala];
const parallel = chains[Chain.Parallel];
const acalaGlmrId = GLMR_ID[Chain.Acala];
const parallelGlmrId = GLMR_ID[Chain.Parallel];

export const GLMR: MoonbeamXcmConfig = <const>{
  asset,
  origin: moonbeam,
  deposit: {
    [acala.chain]: {
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
    [parallel.chain]: {
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
  },
  withdraw: {
    [acala.chain]: withdraw.xTokens({
      balance: balance.tokens(acalaGlmrId),
      destination: acala,
      existentialDeposit: 100_000_000_000_000_000,
      feePerWeight: 8_000_000,
    }),
    [parallel.chain]: withdraw.xTokens({
      balance: balance.assets(parallelGlmrId),
      destination: parallel,
      feePerWeight: 8,
    }),
  },
};
