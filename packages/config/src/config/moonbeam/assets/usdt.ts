import { AssetSymbol, ChainKey } from '../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../extrinsic';
import { getOriginAssetId, getPalletInstance } from '../../config.utils';
import { assets, balance, chains, extrinsic } from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[AssetSymbol.USDT];
const origin = chains[ChainKey.Statemint];
const originAssetId = getOriginAssetId(asset);

export const USDT: MoonbeamXcmConfig = {
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
        .X2(getPalletInstance(origin), originAssetId),
    },
  },
  withdraw: {},
};
