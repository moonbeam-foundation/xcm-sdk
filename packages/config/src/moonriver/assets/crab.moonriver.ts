import { Assets, CRAB } from '../assets.moonriver';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Darwinia, PARACHAIN_ID } from '../chains.moonriver';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';

export const crabConfig: XcmConfig<Assets> = {
  assetId: CRAB.id,
  originSymbol: CRAB.originSymbol,
  originName: Darwinia.name,
  deposit: [
    {
      ...Darwinia,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: {
        pallet: 'polkadotXcm',
        extrinsic: 'limitedReserveTransferAssets',
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
                    parents: 0,
                    interior: {
                      X1: {
                        PalletInstance: 5,
                      },
                    },
                  },
                },
                fun: {
                  Fungible: '%plankAmount%',
                },
              },
            ],
          },
          // feeAssetLimit
          0,
          {
            Limited: '%weight%',
          },
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Darwinia, {
      feePerWeight: 8,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
