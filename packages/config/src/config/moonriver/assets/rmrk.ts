import { AssetSymbol, ChainKey } from '../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../extrinsic';
import { getAssetForeignId, getPalletInstance } from '../../config.utils';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[AssetSymbol.RMRK];
const origin = chains[ChainKey.Statemine];
const originAssetId = getAssetForeignId(asset, origin.key);

export const RMRK: MoonriverXcmConfig = {
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
      feePerWeight: 0.000126,
    }),
  },
};
