export enum EqBalancesExtrinsic {
  XcmTransfer = 'xcmTransfer',
  TransferXcm = 'transferXcm',
}

export enum EqBalancesSuccessEvent {
  ExtrinsicSuccess = 'ExtrinsicSuccess',
}

export enum EqBalancesFee {
  SovereignAccWillPay = 'SovereignAccWillPay',
  TargetChainAccWillPay = 'TargetChainAccWillPay',
  ThisAccWillPay = 'ThisAccWillPay',
}
