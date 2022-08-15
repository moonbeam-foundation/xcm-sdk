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
const calamari = chains[Chain.CalamariAlphanet];
const karura = chains[Chain.KaruraAlphanet];

const astarDevId = getMoonAssetId(astar);
const calamariDevId = getMoonAssetId(calamari);
const karuraDevId = getMoonAssetId(karura);

export const DEV: MoonbaseXcmConfig = <const>{
  asset,
  origin: moonbase,
  deposit: {
    [astar.chain]: {
      origin: astar,
      balance: balance.system(),
      extrinsicFeeBalance: balance.system(),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveWithdrawAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(astar)
        .V1()
        .X2(getPalletInstance(astar)),
    },
    [calamari.chain]: {
      origin: calamari,
      balance: balance.assets(calamariDevId),
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
