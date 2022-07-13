import { Assets, MOVR_SYMBOL, MOVR_ID } from './assets.moonriver';
import { NativeTokenConfig } from '../interfaces/xcm-config.interfaces';
import {
  Bifrost,
  Karura,
  Khala,
  Parallel,
  PARACHAIN_ID,
} from './chains.moonriver';
import {
  createSystemBalanceConfig,
  createTokensBalanceConfig,
  createWithdrawConfig,
  createAssetsBalanceConfig,
} from '../xcm-config.utils';
import { XTokensPallet } from '../interfaces/XTokensPallet.interface';

export const nativeTokenXcmConfigMoonriver: NativeTokenConfig<Assets> = {
  deposit: [
    {
      ...Karura,
      assetBalance: createTokensBalanceConfig<Assets>(MOVR_ID.Karura),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          // currencyId
          {
            ForeignAsset: MOVR_ID.Karura,
          },
          // amount
          '%plankAmount%',
          // dest
          {
            V1: {
              parents: 1,
              interior: {
                X2: [
                  {
                    Parachain: PARACHAIN_ID,
                  },
                  {
                    AccountKey20: {
                      network: 'Any',
                      key: '%account%',
                    },
                  },
                ],
              },
            },
          },
          '%weight%',
        ],
      },
    },
    {
      ...Bifrost,
      assetBalance: createTokensBalanceConfig<Assets>(MOVR_SYMBOL),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          // currencyId
          {
            Token: MOVR_SYMBOL,
          },
          // amount
          '%plankAmount%',
          // dest
          {
            V1: {
              parents: 1,
              interior: {
                X2: [
                  {
                    Parachain: PARACHAIN_ID,
                  },
                  {
                    AccountKey20: {
                      network: 'Any',
                      key: '%account%',
                    },
                  },
                ],
              },
            },
          },
          '%weight%',
        ],
      },
    },
    {
      ...Khala,
      assetBalance: createAssetsBalanceConfig(MOVR_ID.Khala),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: {
        pallet: 'xTransfer',
        extrinsic: 'transfer',
        successEvent: 'Withdrawn',
        params: [
          {
            id: {
              Concrete: {
                parents: 1,
                interior: {
                  X2: [
                    {
                      Parachain: PARACHAIN_ID,
                    },
                    {
                      PalletInstance: 10,
                    },
                  ],
                },
              },
            },
            fun: {
              Fungible: '%plankAmount%',
            },
          },
          // dest
          {
            parents: 1,
            interior: {
              X2: [
                {
                  Parachain: PARACHAIN_ID,
                },
                {
                  AccountKey20: {
                    network: 'Any',
                    key: '%account%',
                  },
                },
              ],
            },
          },
          '%weight%',
        ],
      },
    },
    {
      ...Parallel,
      assetBalance: createAssetsBalanceConfig(MOVR_ID.Parallel),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          // currencyId
          MOVR_ID.Parallel,
          // amount
          '%plankAmount%',
          // dest
          {
            V1: {
              parents: 1,
              interior: {
                X2: [
                  {
                    Parachain: PARACHAIN_ID,
                  },
                  {
                    AccountKey20: {
                      network: 'Any',
                      key: '%account%',
                    },
                  },
                ],
              },
            },
          },
          '%weight%',
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Karura, {
      feePerWeight: 50_000,
      existentialDeposit: 1_000_000_000_000_000,
      assetBalance: createTokensBalanceConfig<Assets>(MOVR_ID.Karura),
    }),
    createWithdrawConfig(Bifrost, {
      feePerWeight: 213_600,
      existentialDeposit: 1_000_000_000_000,
      assetBalance: createTokensBalanceConfig<Assets>(MOVR_SYMBOL),
    }),
    createWithdrawConfig(Khala, {
      feePerWeight: 50_000,
      existentialDeposit: 10_000_000_000,
      assetBalance: createAssetsBalanceConfig(MOVR_ID.Khala),
    }),
    createWithdrawConfig(Parallel, {
      feePerWeight: 0.48,
      assetBalance: createAssetsBalanceConfig(MOVR_ID.Parallel),
    }),
  ],
};
