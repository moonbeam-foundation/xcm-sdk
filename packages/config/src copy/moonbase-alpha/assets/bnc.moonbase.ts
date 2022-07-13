import { Assets, BNC } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Bifrost_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const bncConfig: XcmConfig<Assets> = {
  assetId: BNC.id,
  originSymbol: BNC.originSymbol,
  originName: Bifrost_Alphanet.name,
  deposit: [
    {
      ...Bifrost_Alphanet,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'Transferred',
        params: [
          // currencyId
          {
            Native: BNC.originSymbol,
          },
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
    createWithdrawConfig(Bifrost_Alphanet, {
      feePerWeight: 8,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
