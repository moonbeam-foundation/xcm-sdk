import { Assets, KAR } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Karura_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const karConfig: XcmConfig<Assets> = {
  assetId: KAR.id,
  originSymbol: KAR.originSymbol,
  originName: Karura_Alphanet.name,
  deposit: [
    {
      ...Karura_Alphanet,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'Transferred',
        params: [
          // currencyId
          {
            Token: KAR.originSymbol,
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
          // weight
          '%weight%',
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Karura_Alphanet, {
      feePerWeight: 8,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
