import { Assets, PARING } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Darwinia_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';

export const paringConfig: XcmConfig<Assets> = {
  assetId: PARING.id,
  originSymbol: PARING.originSymbol,
  originName: Darwinia_Alphanet.name,
  deposit: [
    {
      ...Darwinia_Alphanet,
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
    createWithdrawConfig(Darwinia_Alphanet, {
      feePerWeight: 8,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
