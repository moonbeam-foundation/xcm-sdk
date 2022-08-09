import { Asset, Chain } from '../../../constants';
import {
  PolkadotXcmExtrinsicSuccessEvent,
  XTokensExtrinsicSuccessEvent,
  XTransferExtrinsicSuccessEvent,
} from '../../../extrinsic';
import { getMoonAssetId, getPalletInstance } from '../../config.utils';
import {
  assets,
  balance,
  chains,
  extrinsic,
  moonriver,
  withdraw,
} from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[Asset.MOVR];
const bifrost = chains[Chain.Bifrost];
const karura = chains[Chain.Karura];
const khala = chains[Chain.Khala];
const parallel = chains[Chain.Parallel];
const shiden = chains[Chain.Shiden];

const karuraMovrId = getMoonAssetId(karura);
const khalaMovrId = getMoonAssetId(khala);
const parallelMovrId = getMoonAssetId(parallel);
const shidenMovrId = getMoonAssetId(shiden);

export const MOVR: MoonriverXcmConfig = <const>{
  asset,
  origin: moonriver,
  deposit: {
    [bifrost.chain]: {
      origin: bifrost,
      balance: balance.tokens('MOVR'),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(bifrost)
        .asset({
          Token: asset.originSymbol,
        }),
    },
    [karura.chain]: {
      origin: karura,
      balance: balance.tokens(karuraMovrId),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(karura)
        .asset({
          ForeignAsset: karuraMovrId,
        }),
    },
    [khala.chain]: {
      origin: khala,
      balance: balance.assets(khalaMovrId),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTransfer()
        .transfer()
        .successEvent(XTransferExtrinsicSuccessEvent.Withdrawn)
        .origin(khala)
        .X2(getPalletInstance(khala)),
    },
    [parallel.chain]: {
      origin: parallel,
      balance: balance.assets(parallelMovrId),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(parallel)
        .asset(parallelMovrId),
    },
    [shiden.chain]: {
      origin: shiden,
      balance: balance.assets(shidenMovrId),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveWithdrawAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(shiden)
        .V1()
        .X2(getPalletInstance(shiden)),
    },
  },
  withdraw: {
    [bifrost.chain]: withdraw.xTokens({
      balance: balance.tokens('MOVR'),
      destination: bifrost,
      feePerWeight: 213_600,
    }),
    [karura.chain]: withdraw.xTokens({
      balance: balance.tokens(karuraMovrId),
      destination: karura,
      feePerWeight: 50_000,
    }),
    [khala.chain]: withdraw.xTokens({
      balance: balance.tokens(khalaMovrId),
      destination: khala,
      feePerWeight: 50_000,
    }),
    [parallel.chain]: withdraw.xTokens({
      balance: balance.assets(parallelMovrId),
      destination: parallel,
      feePerWeight: 0.48,
    }),
    [shiden.chain]: withdraw.xTokens({
      balance: balance.assets(shidenMovrId),
      destination: shiden,
      feePerWeight: 50_000,
    }),
  },
};
