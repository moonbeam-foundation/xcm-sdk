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
  NativeAssetId = 'NativeAssetId',
  NativeToken = 'NativeToken',
  OtherReserve = 'OtherReserve',
  Token = 'Token',
  Token2 = 'Token2',
}
