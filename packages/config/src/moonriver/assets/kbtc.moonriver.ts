import { Assets, KBTC, KINT } from '../assets.moonriver';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Kintsugi, PARACHAIN_ID } from '../chains.moonriver';
import {
  createTokensBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const kbtcConfig: XcmConfig<Assets> = {
  assetId: KBTC.id,
  originSymbol: KBTC.originSymbol,
  originName: Kintsugi.name,
  deposit: [
    {
      ...Kintsugi,
      assetBalance: createTokensBalanceConfig<Assets>(KBTC.originSymbol),
      extrinsicFeeBalance: createTokensBalanceConfig<Assets>(KINT.originSymbol),
      xcmFeeBalance: {
        assetId: KINT.id,
        symbol: KINT.originSymbol,
      },
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transferMulticurrencies',
        successEvent: 'TransferredMultiAssets',
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
    createWithdrawConfig(Kintsugi, {
      feePerWeight: 0.000000107,
      assetBalance: createTokensBalanceConfig<Assets>(KBTC.originSymbol),
    }),
  ],
};
