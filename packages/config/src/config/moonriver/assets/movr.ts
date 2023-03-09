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
  moonriver,
  withdraw,
} from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[AssetSymbol.MOVR];
const bifrost = chains[ChainKey.Bifrost];
const calamari = chains[ChainKey.Calamari];
const crust = chains[ChainKey.CrustShadow];
const karura = chains[ChainKey.Karura];
const khala = chains[ChainKey.Khala];
const parallel = chains[ChainKey.Parallel];
const shiden = chains[ChainKey.Shiden];

const calamariMovrId = getMoonAssetId(calamari);
const crustMovrId = getMoonAssetId(crust);
const karuraMovrId = getMoonAssetId(karura);
const khalaMovrId = getMoonAssetId(khala);
const parallelMovrId = getMoonAssetId(parallel);
const shidenMovrId = getMoonAssetId(shiden);

export const MOVR: MoonriverXcmConfig = {
  asset,
  origin: moonriver,
  deposit: {
    [bifrost.key]: {
      source: bifrost,
      balance: balance.tokens().token(AssetSymbol.MOVR),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(bifrost)
        .asset({
          [XTokensExtrinsicCurrencyTypes.Token]: asset.originSymbol,
        }),
    },
    [calamari.key]: {
      source: calamari,
      balance: balance.assets(calamariMovrId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(calamari)
        .asset({
          [XTokensExtrinsicCurrencyTypes.MantaCurrency]: calamariMovrId,
        }),
    },
    [crust.key]: {
      source: crust,
      balance: balance.assets(crustMovrId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(crust)
        .asset({
          [XTokensExtrinsicCurrencyTypes.OtherReserve]: crustMovrId,
        }),
    },
    [karura.key]: {
      source: karura,
      balance: balance.tokens().foreignAsset(karuraMovrId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(karura)
        .asset({
          [XTokensExtrinsicCurrencyTypes.ForeignAsset]: karuraMovrId,
        }),
    },
    [khala.key]: {
      source: khala,
      balance: balance.assets(khalaMovrId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTransfer()
        .transfer()
        .successEvent(XTransferExtrinsicSuccessEvent.Withdrawn)
        .origin(khala)
        .X2(getPalletInstance(khala)),
    },
    [parallel.key]: {
      source: parallel,
      balance: balance.assets(parallelMovrId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(parallel)
        .asset(parallelMovrId),
    },
    [shiden.key]: {
      source: shiden,
      balance: balance.assets(shidenMovrId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveWithdrawAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .V1V2()
        .X2(getPalletInstance(shiden)),
    },
  },
  withdraw: {
    [bifrost.key]: withdraw.xTokens({
      balance: balance.tokens().token(AssetSymbol.MOVR),
      destination: bifrost,
      feePerWeight: 213_600,
    }),
    [calamari.key]: withdraw.xTokens({
      balance: balance.assets(calamariMovrId),
      destination: calamari,
      feePerWeight: 50_000,
      sourceMinBalance: balance.minAssetPallet(calamariMovrId),
    }),
    [crust.key]: withdraw.xTokens({
      balance: balance.assets(crustMovrId),
      destination: crust,
      feePerWeight: 50_000,
    }),
    [karura.key]: withdraw.xTokens({
      balance: balance.tokens().foreignAsset(karuraMovrId),
      destination: karura,
      feePerWeight: 50_000,
      sourceMinBalance: balance.minAssetRegistryPallet(karuraMovrId),
    }),
    [khala.key]: withdraw.xTokens({
      balance: balance.assets(khalaMovrId),
      destination: khala,
      feePerWeight: 50_000,
    }),
    [parallel.key]: withdraw.xTokens({
      balance: balance.assets(parallelMovrId),
      destination: parallel,
      feePerWeight: 0.48,
    }),
    [shiden.key]: withdraw.xTokens({
      balance: balance.assets(shidenMovrId),
      destination: shiden,
      feePerWeight: 50_000,
    }),
  },
};
