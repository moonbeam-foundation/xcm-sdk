import { Assets, BSX } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Basilisk_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const bsxConfig: XcmConfig<Assets> = {
  assetId: BSX.id,
  originSymbol: BSX.originSymbol,
  originName: Basilisk_Alphanet.name,
  deposit: [
    {
      ...Basilisk_Alphanet,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'Transferred',
        params: [
          // currencyId
          0,
          // amount
          '%plankAmount%',
          // dest
          {
            V1: {
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
          },
          '%weight%',
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Basilisk_Alphanet, {
      feePerWeight: 1,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
