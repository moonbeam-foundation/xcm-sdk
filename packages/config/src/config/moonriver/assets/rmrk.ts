import { AssetSymbol, ChainKey } from '../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../extrinsic';
import { getOriginAssetId, getPalletInstance } from '../../config.utils';
import { assets, balance, chains, extrinsic } from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[AssetSymbol.RMRK];
const origin = chains[ChainKey.Statemine];
const originAssetId = getOriginAssetId(asset);
const palletInstance = getPalletInstance(origin);

export const RMRK: MoonriverXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      origin,
      balance: balance.assets(originAssetId),
      sourceFeeBalance: balance.system(),
      sourceMinBalance: balance.min(originAssetId),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin)
        .V1()
        .X2(palletInstance, originAssetId),
    },
  },
  withdraw: {},
};
