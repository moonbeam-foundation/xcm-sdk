import { Assets, USDT } from '../assets.moonriver';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { PARACHAIN_ID, Statemine } from '../chains.moonriver';
import {
  createAssetsBalanceConfig,
  createMinBalanceConfig,
  createSystemBalanceConfig,
} from '../../xcm-config.utils';

export const usdtConfig: XcmConfig<Assets> = {
  assetId: USDT.id,
  originSymbol: USDT.originSymbol,
  originName: Statemine.name,
  deposit: [
    {
      ...Statemine,
      assetBalance: createAssetsBalanceConfig(USDT.assetId),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      assetMinBalance: createMinBalanceConfig(USDT.assetId),
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
                      X2: [
                        {
                          PalletInstance: 50,
                        },
                        {
                          GeneralIndex: USDT.assetId,
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
          // fee asset item
          0,
          {
            Limited: '%weight%',
          },
        ],
      },
    },
  ],
  withdraw: [],
};
