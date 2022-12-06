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
const pioneer = chains[ChainKey.BitCountryPioneer];

const pioneerDevId = getMoonAssetId(pioneer);

export const DEV: MoonbaseXcmConfig = {
  asset,
  origin: moonbase,
  deposit: {
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
    [pioneer.key]: withdraw.xTokens({
      balance: balance.tokens().fungibleToken(pioneerDevId),
      destination: pioneer,
      feePerWeight: 50_000,
    }),
  },
};
