import { BalanceCurrencyTypes } from '../../../balance';
import { AssetSymbol, ChainKey } from '../../../constants';
import {
  PolkadotXcmExtrinsicSuccessEvent,
  XTokensExtrinsicCurrencyTypes,
  XTokensExtrinsicSuccessEvent,
  XTransferExtrinsicSuccessEvent,
} from '../../../extrinsic';
import { getMoonAssetId, getPalletInstance } from '../../config.utils';
import {
  assets,
  balance,
  chains,
  extrinsic,
  moonbeam,
  withdraw,
} from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[AssetSymbol.GLMR];
const acala = chains[ChainKey.Acala];
const astar = chains[ChainKey.Astar];
const parallel = chains[ChainKey.Parallel];
const phala = chains[ChainKey.Phala];

const acalaGlmrId = getMoonAssetId(acala);
const astarGlmrId = getMoonAssetId(astar);
const parallelGlmrId = getMoonAssetId(parallel);
const phalaGlmrId = getMoonAssetId(phala);

export const GLMR: MoonbeamXcmConfig = {
  asset,
  origin: moonbeam,
  deposit: {
    [acala.key]: {
      source: acala,
      balance: balance.tokens({
        [BalanceCurrencyTypes.ForeignAsset]: acalaGlmrId,
      }),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(acala)
        .asset({
          [XTokensExtrinsicCurrencyTypes.ForeignAsset]: acalaGlmrId,
        }),
    },
    [astar.key]: {
      source: astar,
      balance: balance.assets(astarGlmrId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveWithdrawAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(astar)
        .V1()
        .X2(getPalletInstance(astar)),
    },
    [parallel.key]: {
      source: parallel,
      balance: balance.assets(parallelGlmrId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(parallel)
        .asset(parallelGlmrId),
    },
    [phala.key]: {
      source: phala,
      balance: balance.assets(phalaGlmrId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTransfer()
        .transfer()
        .successEvent(XTransferExtrinsicSuccessEvent.Withdrawn)
        .origin(phala)
        .X2(10),
    },
  },
  withdraw: {
    [acala.key]: withdraw.xTokens({
      balance: balance.tokens({
        [BalanceCurrencyTypes.ForeignAsset]: acalaGlmrId,
      }),
      destination: acala,
      feePerWeight: 8_000_000,
      sourceMinBalance: balance.minAssetRegistryPallet(acalaGlmrId),
    }),
    [astar.key]: withdraw.xTokens({
      balance: balance.assets(astarGlmrId),
      destination: astar,
      feePerWeight: 50_000,
    }),
    [parallel.key]: withdraw.xTokens({
      balance: balance.assets(parallelGlmrId),
      destination: parallel,
      feePerWeight: 8,
    }),
    [phala.key]: withdraw.xTokens({
      balance: balance.assets(phalaGlmrId),
      destination: phala,
      feePerWeight: 50_000,
    }),
  },
};
