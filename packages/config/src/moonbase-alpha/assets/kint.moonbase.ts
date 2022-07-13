import { Assets, KINT } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { interBTC_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createTokensBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const kintConfig: XcmConfig<Assets> = {
  assetId: KINT.id,
  originSymbol: KINT.originSymbol,
  originName: interBTC_Alphanet.name,
  deposit: [
    {
      ...interBTC_Alphanet,
      assetBalance: createTokensBalanceConfig<Assets>(KINT.originSymbol),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'Transferred',
        params: [
          // currencyId
          {
            Token: KINT.originSymbol,
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
    createWithdrawConfig(interBTC_Alphanet, {
      feePerWeight: 8,
      assetBalance: createTokensBalanceConfig<Assets>(KINT.originSymbol),
    }),
  ],
};
