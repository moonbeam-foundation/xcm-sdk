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

const cloverDevId = getMoonAssetId(clover);

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
  },
  withdraw: {
    [clover.key]: withdraw.xTokens({
      balance: balance.assets(cloverDevId),
      destination: clover,
      feePerWeight: 50_000,
    }),
  },
};
