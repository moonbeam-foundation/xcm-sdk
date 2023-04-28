import { AssetSymbol, ChainKey } from '../../../constants';
import { EqBalancesSuccessEvent } from '../../../extrinsic/eqBalances';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbeam.common';
import { MoonbeamXcmConfig } from '../moonbeam.interfaces';

const asset = assets[AssetSymbol.EQ];
const origin = chains[ChainKey.Equilibrium];
const eqId = 25_969;

export const EQ: MoonbeamXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.systemEquilibrium(eqId),
      extrinsic: extrinsic
        .eqBalances()
        .transferXcm()
        .successEvent(EqBalancesSuccessEvent.ExtrinsicSuccess)
        .asset(eqId)
        .feeAsset(eqId),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.systemEquilibrium(eqId),
      destination: origin,
      feePerWeight: 100,
    }),
  },
};
