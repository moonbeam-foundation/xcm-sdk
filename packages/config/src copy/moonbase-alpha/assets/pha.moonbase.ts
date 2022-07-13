import { Assets, PHA } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Khala_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';

export const phaConfig: XcmConfig<Assets> = {
  assetId: PHA.id,
  originSymbol: PHA.originSymbol,
  originName: Khala_Alphanet.name,
  deposit: [
    {
      ...Khala_Alphanet,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: {
        pallet: 'xTransfer',
        extrinsic: 'transfer',
        successEvent: 'Deposited',
        params: [
          // asset
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
          // dest
          {
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
          // weight
          '%weight%',
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Khala_Alphanet, {
      feePerWeight: 80,
      existentialDeposit: 10_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
