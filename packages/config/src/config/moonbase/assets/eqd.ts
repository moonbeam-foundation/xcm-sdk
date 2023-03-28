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
const feeAsset = assets[AssetSymbol.EQ];
const eqa = chains[ChainKey.EquilibriumAlphanet];
const eqId = 25_969;
const eqdId = 6_648_164;

export const EQD: MoonbaseXcmConfig = {
  asset,
  origin: moonbase,
  deposit: {
    [eqa.key]: {
      source: eqa,
      balance: balance.systemEquilibrium(eqdId),
      sourceFeeBalance: balance.systemEquilibrium(eqId),
      xcmFeeAsset: {
        asset: feeAsset,
        balance: balance.systemEquilibrium(eqId),
      },
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
