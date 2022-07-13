import { Assets, DEV_ID } from './assets.moonbase';
// import { MOVR_SYMBOL } from '../moonriver/assets.moonriver';
import { NativeTokenConfig } from '../interfaces/xcm-config.interfaces';
import {
  // Bifrost_Alphanet,
  Karura_Alphanet,
  // Parallel_Alphanet,
  Calamari_Alphanet,
  Astar_Alphanet,
  PARACHAIN_ID,
} from './chains.moonbase';
import {
  createSystemBalanceConfig,
  createTokensBalanceConfig,
  createAssetsBalanceConfig,
  createWithdrawConfig,
} from '../xcm-config.utils';
import { XTokensPallet } from '../interfaces/XTokensPallet.interface';

export const nativeTokenXcmConfigMoonbase: NativeTokenConfig<Assets> = {
  deposit: [
    // {
    //   ...Bifrost_Alphanet,
    //   assetBalance: createTokensBalanceConfig<Assets>(MOVR_SYMBOL),
    //   extrinsicFeeBalance: createSystemBalanceConfig(),
    //   xcmExtrinsic: {
    //     pallet: 'xTokens',
    //     extrinsic: 'transfer',
    //     successEvent: 'Transferred',
    //     params: [
    //       // currencyId
    //       {
    //         Token: MOVR_SYMBOL,
    //       },
    //       // amount
    //       '%plankAmount%',
    //       // dest
    //       {
    //         V1: {
    //           parents: 1,
    //           interior: {
    //             X2: [
    //               {
    //                 Parachain: PARACHAIN_ID,
    //               },
    //               {
    //                 AccountKey20: {
    //                   network: 'Any',
    //                   key: '%account%',
    //                 },
    //               },
    //             ],
    //           },
    //         },
    //       },
    //       '%weight%',
    //     ],
    //   },
    // },
    {
      ...Karura_Alphanet,
      assetBalance: createTokensBalanceConfig<Assets>(DEV_ID.Karura_Alphanet),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'Transferred',
        params: [
          // currencyId
          {
            ForeignAsset: DEV_ID.Karura_Alphanet,
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
    // {
    //   ...Parallel_Alphanet,
    //   assetBalance: createAssetsBalanceConfig(DEV_ID.Parallel_Alphanet),
    //   extrinsicFeeBalance: createSystemBalanceConfig(),
    //   xcmExtrinsic: {
    //     pallet: 'xTokens',
    //     extrinsic: 'transfer',
    //     successEvent: 'TransferredMultiAssets',
    //     params: [
    //       // currencyId
    //       DEV_ID.Parallel_Alphanet,
    //       // amount
    //       '%plankAmount%',
    //       // dest
    //       {
    //         V1: {
    //           parents: 1,
    //           interior: {
    //             X2: [
    //               {
    //                 Parachain: PARACHAIN_ID,
    //               },
    //               {
    //                 AccountKey20: {
    //                   network: 'Any',
    //                   key: '%account%',
    //                 },
    //               },
    //             ],
    //           },
    //         },
    //       },
    //       '%weight%',
    //     ],
    //   },
    // },
    {
      ...Calamari_Alphanet,
      assetBalance: createAssetsBalanceConfig(DEV_ID.Calamari_Alphanet),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          // currencyId
          {
            MantaCurrency: DEV_ID.Calamari_Alphanet,
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
      ...Astar_Alphanet,
      assetBalance: createAssetsBalanceConfig(DEV_ID.Astar_Alphanet),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: {
        pallet: 'polkadotXcm',
        extrinsic: 'limitedReserveWithdrawAssets',
        successEvent: 'Attempted',
        params: [
          // dest
          {
            V1: {
              parents: 1,
              interior: {
                X1: {
                  Parachain: PARACHAIN_ID,
                },
              },
            },
          },
          // beneficiary
          {
            V1: {
              parents: 0,
              interior: {
                X1: {
                  AccountKey20: {
                    network: 'Any',
                    key: '%account%',
                  },
                },
              },
            },
          },
          // assets
          {
            V1: [
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
                          PalletInstance: 3,
                        },
                      ],
                    },
                  },
                },
                fun: {
                  Fungible: '%plankAmount%',
                },
              },
            ],
          },
          // feeAssetItem
          0,
          // weightLimit
          {
            Limited: '%weight%',
          },
        ],
      },
    },
  ],
  withdraw: [
    // createWithdrawConfig(Bifrost_Alphanet, {
    //   feePerWeight: 50_000,
    //   assetBalance: createTokensBalanceConfig<Assets>(MOVR_SYMBOL),
    // }),
    createWithdrawConfig(Karura_Alphanet, {
      feePerWeight: 50_000,
      assetBalance: createTokensBalanceConfig<Assets>(DEV_ID.Karura_Alphanet),
    }),
    // createWithdrawConfig(Parallel_Alphanet, {
    //   feePerWeight: 50_000,
    //   assetBalance: createAssetsBalanceConfig(DEV_ID.Parallel_Alphanet),
    // }),
    createWithdrawConfig(Calamari_Alphanet, {
      feePerWeight: 50_000,
      assetBalance: createAssetsBalanceConfig(DEV_ID.Calamari_Alphanet),
    }),
    createWithdrawConfig(Astar_Alphanet, {
      feePerWeight: 50_000,
      assetBalance: createAssetsBalanceConfig(DEV_ID.Astar_Alphanet),
    }),
  ],
};
