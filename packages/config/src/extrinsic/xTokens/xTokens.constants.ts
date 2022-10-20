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
  ForeignAsset = 'ForeignAsset',
  FungibleToken = 'FungibleToken',
  MantaCurrency = 'MantaCurrency',
  MiningResource = 'MiningResource',
  Native = 'Native',
  NativeToken = 'NativeToken',
  OtherReserve = 'OtherReserve',
  Token = 'Token',
}
