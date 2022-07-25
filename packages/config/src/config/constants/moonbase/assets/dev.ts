import { Assets, Chain, DEV_ID } from '../../../../constants';
import {
  PolkadotXcmExtrinsicSuccessEvent,
  XTokensExtrinsicSuccessEvent,
} from '../../../../extrinsic';
import { MoonbaseAssets } from '../../../../interfaces';
import { XcmConfig } from '../../../config.interfaces';
import {
  assets,
  balance,
  chains,
  extrinsic,
  moonbase,
  withdraw,
} from '../moonbase.common';

const asset = assets[Assets.DEV];
const karura = chains[Chain.KaruraAlphanet];
const calamari = chains[Chain.CalamariAlphanet];
const astar = chains[Chain.AstarAlphanet];

const karuraDevId = DEV_ID[Chain.KaruraAlphanet];
const calamariDevId = DEV_ID[Chain.CalamariAlphanet];
const astarDevId = DEV_ID[Chain.AstarAlphanet];

export const DEV: XcmConfig<MoonbaseAssets> = {
  asset,
  origin: moonbase,
  deposit: [
    {
      origin: astar,
      balance: balance.assets(astarDevId),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveWithdrawAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(astar)
        .V1()
        .X2(3),
    },
    {
      origin: calamari,
      balance: balance.assets(karuraDevId),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(calamari)
        .asset({ MantaCurrency: calamariDevId }),
    },
    {
      origin: karura,
      balance: balance.tokens(karuraDevId),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
        .origin(karura)
        .asset({ ForeignAsset: karuraDevId }),
    },
  ],
  withdraw: [
    withdraw.xTokens({
      balance: balance.assets(astarDevId),
      destination: astar,
      feePerWeight: 50_000,
    }),
    withdraw.xTokens({
      balance: balance.assets(calamariDevId),
      destination: calamari,
      feePerWeight: 50_000,
    }),
    withdraw.xTokens({
      balance: balance.assets(karuraDevId),
      destination: karura,
      feePerWeight: 50_000,
    }),
  ],
};
