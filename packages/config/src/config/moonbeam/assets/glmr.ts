import { Asset, Chain } from '../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../extrinsic';
import { getMoonAssetId } from '../../config.utils';
import {
  assets,
  balance,
  chains,
  extrinsic,
  moonbeam,
  withdraw,
} from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[Asset.GLMR];
const acala = chains[Chain.Acala];
const parallel = chains[Chain.Parallel];

const acalaGlmrId = getMoonAssetId(acala);
const parallelGlmrId = getMoonAssetId(parallel);

export const GLMR: MoonbeamXcmConfig = <const>{
  asset,
  origin: moonbeam,
  deposit: {
    [acala.chain]: {
      origin: acala,
      balance: balance.tokens(acalaGlmrId),
      sourceFeeBalance: balance.system(),
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
      sourceFeeBalance: balance.system(),
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
      feePerWeight: 8_000_000,
    }),
    [parallel.chain]: withdraw.xTokens({
      balance: balance.assets(parallelGlmrId),
      destination: parallel,
      feePerWeight: 8,
    }),
  },
};
