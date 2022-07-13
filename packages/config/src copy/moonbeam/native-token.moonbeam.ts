import { Assets, GLMR_ID } from './assets.moonbeam';
import { NativeTokenConfig } from '../interfaces/xcm-config.interfaces';
import { Acala, Parallel, PARACHAIN_ID } from './chains.moonbeam';
import {
  createSystemBalanceConfig,
  createTokensBalanceConfig,
  createWithdrawConfig,
  createAssetsBalanceConfig,
} from '../xcm-config.utils';
import { XTokensPallet } from '../interfaces/XTokensPallet.interface';

export const nativeTokenXcmConfigMoonbeam: NativeTokenConfig<Assets> = {
  deposit: [
    {
      ...Acala,
      assetBalance: createTokensBalanceConfig<Assets>(GLMR_ID.Acala),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          // currencyId
          {
            ForeignAsset: GLMR_ID.Acala,
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
      ...Parallel,
      assetBalance: createAssetsBalanceConfig(GLMR_ID.Parallel),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          // currencyId
          GLMR_ID.Parallel,
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
    createWithdrawConfig(Acala, {
      feePerWeight: 8_000_000,
      existentialDeposit: 100_000_000_000_000_000,
      assetBalance: createTokensBalanceConfig<Assets>(GLMR_ID.Acala),
    }),
    createWithdrawConfig(Parallel, {
      feePerWeight: 8,
      assetBalance: createAssetsBalanceConfig(GLMR_ID.Parallel),
    }),
  ],
};
