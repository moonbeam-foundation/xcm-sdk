import { Asset, Chain } from '../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../extrinsic';
import { getOriginAssetId, getPalletInstance } from '../../config.utils';
import { assets, balance, chains, extrinsic } from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[Asset.RMRK];
const origin = chains[Chain.Statemine];
const originAssetId = getOriginAssetId(asset);
const palletInstance = getPalletInstance(origin);

export const RMRK: MoonriverXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.chain]: {
      origin,
      balance: balance.assets(originAssetId),
      extrinsicFeeBalance: balance.system(),
      minBalance: balance.min(originAssetId),
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
