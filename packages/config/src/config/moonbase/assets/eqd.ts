import { AssetSymbol, ChainKey } from '../../../constants';
import {
  EqBalancesFee,
  EqBalancesSuccessEvent,
} from '../../../extrinsic/eqBalances';
import {
  assets,
  balance,
  chains,
  extrinsic,
  moonbase,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[AssetSymbol.EQD];
const eqa = chains[ChainKey.EquilibriumAlphanet];
const eqdId = 6_648_164;

export const EQD: MoonbaseXcmConfig = {
  asset,
  origin: moonbase,
  deposit: {
    [eqa.key]: {
      source: eqa,
      balance: balance.systemEquilibrium(eqdId),
      extrinsic: extrinsic
        .eqBalances()
        .xcmTransfer()
        .successEvent(EqBalancesSuccessEvent.ExtrinsicSuccess)
        .asset(eqdId)
        .fee(EqBalancesFee.ThisAccWillPay),
    },
  },
  withdraw: {
    [eqa.key]: withdraw.xTokens({
      balance: balance.systemEquilibrium(eqdId),
      destination: eqa,
      feePerWeight: 0.1,
    }),
  },
};
