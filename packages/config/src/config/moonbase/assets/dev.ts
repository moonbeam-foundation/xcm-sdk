import { Asset, Chain, DEV_ID } from '../../../constants';
import {
  PolkadotXcmExtrinsicSuccessEvent,
  XTokensExtrinsicSuccessEvent,
} from '../../../extrinsic';
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
const karura = chains[Chain.KaruraAlphanet];
const calamari = chains[Chain.CalamariAlphanet];
const astar = chains[Chain.AstarAlphanet];

const karuraDevId = DEV_ID[Chain.KaruraAlphanet];
const calamariDevId = DEV_ID[Chain.CalamariAlphanet];
const astarDevId = DEV_ID[Chain.AstarAlphanet];

export const DEV: MoonbaseXcmConfig = <const>{
  asset,
  origin: moonbase,
  deposit: {
    [astar.chain]: {
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
    [calamari.chain]: {
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
    [karura.chain]: {
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
  },
  withdraw: {
    [astar.chain]: withdraw.xTokens({
      balance: balance.assets(astarDevId),
      destination: astar,
      feePerWeight: 50_000,
    }),
    [calamari.chain]: withdraw.xTokens({
      balance: balance.assets(calamariDevId),
      destination: calamari,
      feePerWeight: 50_000,
    }),
    [karura.chain]: withdraw.xTokens({
      balance: balance.assets(karuraDevId),
      destination: karura,
      feePerWeight: 50_000,
    }),
  },
};
