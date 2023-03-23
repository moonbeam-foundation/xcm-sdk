import { AssetSymbol, ChainKey } from '../../../constants';
import {
  XTokensExtrinsicCurrencyTypes,
  XTokensExtrinsicSuccessEvent,
} from '../../../extrinsic';
import { EqBalancesSuccessEvent } from '../../../extrinsic/eqBalances';
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
const eqa = chains[ChainKey.EquilibriumAlphanet];
const pioneer = chains[ChainKey.BitCountryPioneer];

const pioneerDevId = getMoonAssetId(pioneer);
const eqaDevId = getMoonAssetId(eqa) as number;

export const DEV: MoonbaseXcmConfig = {
  asset,
  origin: moonbase,
  deposit: {
    [eqa.key]: {
      source: eqa,
      balance: balance.systemEquilibrium(eqaDevId),
      extrinsic: extrinsic
        .eqBalances()
        .xcmTransfer()
        .successEvent(EqBalancesSuccessEvent.ExtrinsicSuccess)
        .asset(eqaDevId),
    },
    [pioneer.key]: {
      source: pioneer,
      balance: balance.tokens().fungibleToken(pioneerDevId),
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
    [eqa.key]: withdraw.xTokens({
      balance: balance.systemEquilibrium(eqaDevId),
      destination: eqa,
      feePerWeight: 0.1,
    }),
    [pioneer.key]: withdraw.xTokens({
      balance: balance.tokens().fungibleToken(pioneerDevId),
      destination: pioneer,
      feePerWeight: 50_000,
    }),
  },
};
