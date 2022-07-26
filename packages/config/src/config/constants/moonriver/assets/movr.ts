import { Asset, Chain, MOVR_ID } from '../../../../constants';
import {
  PolkadotXcmExtrinsicSuccessEvent,
  XTokensExtrinsicSuccessEvent,
  XTransferExtrinsicSuccessEvent,
} from '../../../../extrinsic';
import {
  assets,
  balance,
  chains,
  moonriver,
  extrinsic,
  withdraw,
} from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[Asset.MOVR];
const bifrost = chains[Chain.Bifrost];
const karura = chains[Chain.Karura];
const khala = chains[Chain.Khala];
const parallel = chains[Chain.Parallel];
const shiden = chains[Chain.Shiden];

const karuraMovrId = MOVR_ID[Chain.Karura];
const khalaMovrId = MOVR_ID[Chain.Khala];
const parallelMovrId = MOVR_ID[Chain.Parallel];
const shidenMovrId = MOVR_ID[Chain.Shiden];

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
        .X2(10),
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
        .X2(10),
    },
  },
  withdraw: {
    [bifrost.chain]: withdraw.xTokens({
      balance: balance.tokens('MOVR'),
      destination: bifrost,
      existentialDeposit: 1_000_000_000_000,
      feePerWeight: 213_600,
    }),
    [karura.chain]: withdraw.xTokens({
      balance: balance.tokens(karuraMovrId),
      destination: karura,
      existentialDeposit: 1_000_000_000_000_000,
      feePerWeight: 50_000,
    }),
    [khala.chain]: withdraw.xTokens({
      balance: balance.tokens(khalaMovrId),
      destination: khala,
      existentialDeposit: 10_000_000_000,
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
