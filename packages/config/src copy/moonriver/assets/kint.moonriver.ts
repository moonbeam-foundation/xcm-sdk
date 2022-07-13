import { Assets, KINT } from '../assets.moonriver';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Kintsugi, PARACHAIN_ID } from '../chains.moonriver';
import {
  createTokensBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const kintConfig: XcmConfig<Assets> = {
  assetId: KINT.id,
  originSymbol: KINT.originSymbol,
  originName: Kintsugi.name,
  deposit: [
    {
      ...Kintsugi,
      assetBalance: createTokensBalanceConfig<Assets>(KINT.originSymbol),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
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
    createWithdrawConfig(Kintsugi, {
      feePerWeight: 0.21,
      assetBalance: createTokensBalanceConfig<Assets>(KINT.originSymbol),
    }),
  ],
};
