import { Asset, Chain } from '../../../constants';
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

const asset = assets[Asset.DEV];
const astar = chains[Chain.AstarAlphanet];
const clover = chains[Chain.CloverAlphanet];

const astarDevId = getMoonAssetId(astar);
const cloverDevId = getMoonAssetId(clover);

export const DEV: MoonbaseXcmConfig = <const>{
  asset,
  origin: moonbase,
  deposit: {
    [astar.chain]: {
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
    [clover.chain]: {
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
    [astar.chain]: withdraw.xTokens({
      balance: balance.assets(astarDevId),
      destination: astar,
      feePerWeight: 50_000,
    }),
    [clover.chain]: withdraw.xTokens({
      balance: balance.assets(cloverDevId),
      destination: clover,
      feePerWeight: 50_000,
    }),
  },
};
