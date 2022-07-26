import { Asset, Chain } from '../../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../../extrinsic';
import { assets, balance, chains, extrinsic } from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[Asset.RMRK];
const origin = chains[Chain.Statemine];

export const RMRK: MoonriverXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.chain]: {
      origin,
      balance: balance.assets(asset.originAssetId!),
      extrinsicFeeBalance: balance.system(),
      minBalance: balance.min(asset.originAssetId!),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin)
        .V1()
        .X2(50, asset.originAssetId!),
    },
  },
  withdraw: {},
};
