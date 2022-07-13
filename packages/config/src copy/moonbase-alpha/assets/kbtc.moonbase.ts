import { Assets, KBTC, KINT } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { interBTC_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createTokensBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const kbtcConfig: XcmConfig<Assets> = {
  assetId: KBTC.id,
  originSymbol: KBTC.originSymbol,
  originName: interBTC_Alphanet.name,
  deposit: [
    {
      ...interBTC_Alphanet,
      assetBalance: createTokensBalanceConfig<Assets>(KBTC.originSymbol),
      extrinsicFeeBalance: createTokensBalanceConfig<Assets>(KINT.originSymbol),
      xcmFeeBalance: {
        assetId: KINT.id,
        symbol: KINT.originSymbol,
      },
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transferMulticurrencies',
        successEvent: 'TransferredMultiCurrencies',
        params: [
          [
            [
              {
                Token: KBTC.originSymbol,
              },
              '%plankAmount%',
            ],
            [
              {
                Token: KINT.originSymbol,
              },
              '%xcmFeePlankAmount%',
            ],
          ],
          1,
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
      feePerWeight: 0.00001,
      assetBalance: createTokensBalanceConfig<Assets>(KBTC.originSymbol),
    }),
  ],
};
