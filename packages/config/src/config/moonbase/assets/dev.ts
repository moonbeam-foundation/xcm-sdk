import { BalanceCurrencyTypes } from '../../../balance';
import { AssetSymbol, ChainKey } from '../../../constants';
import {
  XTokensExtrinsicCurrencyTypes,
  XTokensExtrinsicSuccessEvent,
} from '../../../extrinsic';
import { getMoonAssetId } from '../../config.utils';
import {
  assets,
  balance,
  chains,
  extrinsic,
  moonbase,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[AssetSymbol.DEV];
const clover = chains[ChainKey.CloverAlphanet];
const pioneer = chains[ChainKey.BitCountryPioneer];

const cloverDevId = getMoonAssetId(clover);
const pioneerDevId = getMoonAssetId(pioneer);

export const DEV: MoonbaseXcmConfig = {
  asset,
  origin: moonbase,
  deposit: {
    [clover.key]: {
      source: clover,
      balance: balance.assets(cloverDevId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(clover)
        .asset({
          [XTokensExtrinsicCurrencyTypes.OtherReserve]: cloverDevId,
        }),
    },
    [pioneer.key]: {
      source: pioneer,
      balance: balance.tokens({
        [BalanceCurrencyTypes.FungibleToken]: pioneerDevId,
      }),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(pioneer)
        .asset({ [XTokensExtrinsicCurrencyTypes.FungibleToken]: pioneerDevId }),
    },
  },
  withdraw: {
    [clover.key]: withdraw.xTokens({
      balance: balance.assets(cloverDevId),
      destination: clover,
      feePerWeight: 50_000,
    }),
    [pioneer.key]: withdraw.xTokens({
      balance: balance.tokens({
        [BalanceCurrencyTypes.FungibleToken]: pioneerDevId,
      }),
      destination: pioneer,
      feePerWeight: 50_000,
    }),
  },
};
