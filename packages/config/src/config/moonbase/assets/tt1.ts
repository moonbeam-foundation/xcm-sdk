import { AssetSymbol, ChainKey } from '../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../extrinsic';
import { getAssetForeignId, getPalletInstance } from '../../config.utils';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[AssetSymbol.TT1];
const origin = chains[ChainKey.StatemineAlphanet];
const originAssetId = getAssetForeignId(asset, origin.key);

export const TT1: MoonbaseXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.assets(originAssetId),
      sourceFeeBalance: balance.system(),
      sourceMinBalance: balance.min(originAssetId),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin)
        .V1()
        .X2(getPalletInstance(origin), originAssetId),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.assets(originAssetId),
      sourceMinBalance: balance.min(originAssetId),
      destination: origin,
      feePerWeight: 1_265_000_000,
    }),
  },
};
