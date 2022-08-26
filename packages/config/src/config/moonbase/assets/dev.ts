import { AssetSymbol, ChainKey } from '../../../constants';
import {
  PolkadotXcmExtrinsicSuccessEvent,
  XTokensExtrinsicSuccessEvent,
} from '../../../extrinsic';
import { getMoonAssetId, getPalletInstance } from '../../config.utils';
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
const astar = chains[ChainKey.AstarAlphanet];
const clover = chains[ChainKey.CloverAlphanet];

const astarDevId = getMoonAssetId(astar);
const cloverDevId = getMoonAssetId(clover);

export const DEV: MoonbaseXcmConfig = {
  asset,
  origin: moonbase,
  deposit: {
    [astar.key]: {
      origin: astar,
      balance: balance.assets(astarDevId),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveWithdrawAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(astar)
        .V1()
        .X2(getPalletInstance(astar)),
    },
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
          OtherReserve: cloverDevId,
        }),
    },
  },
  withdraw: {
    [astar.key]: withdraw.xTokens({
      balance: balance.assets(astarDevId),
      destination: astar,
      feePerWeight: 50_000,
    }),
    [clover.key]: withdraw.xTokens({
      balance: balance.assets(cloverDevId),
      destination: clover,
      feePerWeight: 50_000,
    }),
  },
};
