import { Assets, ASTR } from '../assets.moonbase';
import { Astar_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';

export const astrConfig: XcmConfig<Assets> = {
  assetId: ASTR.id,
  originSymbol: ASTR.originSymbol,
  originName: Astar_Alphanet.name,
  deposit: [
    {
      ...Astar_Alphanet,
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
                    interior: 'Here',
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
          // weight
          {
            Limited: '%weight%',
          },
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Astar_Alphanet, {
      feePerWeight: 8_000_000,
      existentialDeposit: 1_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
