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
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[AssetSymbol.EQ];
const eqa = chains[ChainKey.EquilibriumAlphanet];
const eqId = 25_969;

export const EQ: MoonbaseXcmConfig = {
  asset,
  origin: eqa,
  deposit: {
    [eqa.key]: {
      source: eqa,
      balance: balance.systemEquilibrium(eqId),
      extrinsic: extrinsic
        .eqBalances()
        .xcmTransfer()
        .successEvent(EqBalancesSuccessEvent.ExtrinsicSuccess)
        .asset(eqId)
        .fee(EqBalancesFee.ThisAccWillPay),
    },
  },
  withdraw: {
    [eqa.key]: withdraw.xTokens({
      balance: balance.systemEquilibrium(eqId),
      destination: eqa,
      feePerWeight: 0.1,
    }),
  },
};
