import { Assets, DOT } from '../assets.moonbeam';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Polkadot, PARACHAIN_ID } from '../chains.moonbeam';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';

export const dotConfig: XcmConfig<Assets> = {
  assetId: DOT.id,
  originSymbol: DOT.originSymbol,
  originName: Polkadot.name,
  deposit: [
    {
      ...Polkadot,
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
    createWithdrawConfig(Polkadot, {
      feePerWeight: 0.13,
      existentialDeposit: 10_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
