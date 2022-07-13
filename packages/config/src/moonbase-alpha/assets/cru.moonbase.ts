import { Assets, CRU } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Crust_Shadow_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { PolkadotXcmPallet } from '../../interfaces/PolkadotXcmPallet.interface';

export const cruConfig: XcmConfig<Assets> = {
  assetId: CRU.id,
  originSymbol: CRU.originSymbol,
  originName: Crust_Shadow_Alphanet.name,
  deposit: [
    {
      ...Crust_Shadow_Alphanet,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <PolkadotXcmPallet>{
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
    createWithdrawConfig(Crust_Shadow_Alphanet, {
      feePerWeight: 1,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
