import { Assets, UNIT } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Alphanet_Relay, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';

export const unitConfig: XcmConfig<Assets> = {
  assetId: UNIT.id,
  originSymbol: UNIT.originSymbol,
  originName: Alphanet_Relay.name,
  deposit: [
    {
      ...Alphanet_Relay,
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
          // weight
          {
            Limited: '%weight%',
          },
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Alphanet_Relay, {
      feePerWeight: 13.77,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
