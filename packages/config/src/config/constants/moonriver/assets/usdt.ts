import { Asset, Chain } from '../../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../../extrinsic';
import { MoonriverAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import { assets, balance, chains, extrinsic } from '../moonriver.common';

const asset = assets[Asset.USDT];
const origin = chains[Chain.Statemine];

// TODO: throw error if there is no asset.originAssetId

export const USDT: XcmConfig<MoonriverAssets> = {
  asset,
  origin,
  deposit: [
    {
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
        .X1(),
    },
  ],
  withdraw: [],
};
