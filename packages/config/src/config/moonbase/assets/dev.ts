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
const centrifuge = chains[ChainKey.CentrifugeAlphanet];

const cloverDevId = getMoonAssetId(clover);
const centrifugeDevId = getMoonAssetId(centrifuge);

export const DEV: MoonbaseXcmConfig = {
  asset,
  origin: moonbase,
  deposit: {
    [clover.key]: {
      origin: clover,
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
    [centrifuge.key]: {
      origin: centrifuge,
      balance: balance.assets(centrifugeDevId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(centrifuge)
        .asset({
          [XTokensExtrinsicCurrencyTypes.OtherReserve]: cloverDevId,
        }),
    },
  },
  withdraw: {
    [clover.key]: withdraw.xTokens({
      balance: balance.assets(cloverDevId),
      destination: clover,
      feePerWeight: 50_000,
    }),
    [centrifuge.key]: withdraw.xTokens({
      balance: balance.ormlTokens(centrifugeDevId),
      destination: centrifuge,
      feePerWeight: 50_000,
    }),
  },
};
