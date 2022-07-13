import { Assets, CSM } from '../assets.moonriver';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { PARACHAIN_ID, Crust_Shadow } from '../chains.moonriver';
import {
  createWithdrawConfig,
  createSystemBalanceConfig,
} from '../../xcm-config.utils';

export const csmConfig: XcmConfig<Assets> = {
  assetId: CSM.id,
  originSymbol: CSM.originSymbol,
  originName: Crust_Shadow.name,
  deposit: [
    {
      ...Crust_Shadow,
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
            V0: [
              {
                ConcreteFungible: {
                  id: 'Null',
                  amount: '%plankAmount%',
                },
              },
            ],
          },
          // fee asset item
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
    createWithdrawConfig(Crust_Shadow, {
      feePerWeight: 1,
      existentialDeposit: 100_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
