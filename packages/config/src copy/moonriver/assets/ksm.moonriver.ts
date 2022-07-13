import { Assets, KSM } from '../assets.moonriver';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Kusama, PARACHAIN_ID } from '../chains.moonriver';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';

export const ksmConfig: XcmConfig<Assets> = {
  assetId: KSM.id,
  originSymbol: KSM.originSymbol,
  originName: Kusama.name,
  deposit: [
    {
      ...Kusama,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: {
        pallet: 'xcmPallet',
        extrinsic: 'limitedReserveTransferAssets',
        successEvent: 'Attempted',
        params: [
          // dest
          {
            V1: {
              parents: 0,
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
          {
            Limited: '%weight%',
          },
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Kusama, {
      feePerWeight: 0.42,
      existentialDeposit: 33_333_333,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
