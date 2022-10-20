export enum XTokensExtrinsic {
  Transfer = 'transfer',
  TransferMultiAsset = 'transferMultiasset',
  TransferMultiCurrencies = 'transferMulticurrencies',
}

export enum XTokensExtrinsicSuccessEvent {
  Transferred = 'Transferred',
  TransferredMultiAssets = 'TransferredMultiAssets',
  TransferredMultiCurrencies = 'TransferredMultiCurrencies',
}

export enum XTokensExtrinsicCurrencyTypes {
  Token = 'Token',
  Native = 'Native',
  ForeignAsset = 'ForeignAsset',
  MantaCurrency = 'MantaCurrency',
  OtherReserve = 'OtherReserve',
}
