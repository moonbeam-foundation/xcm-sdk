import { Assets, KAR, KUSD } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Karura_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createTokensBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const kusdConfig: XcmConfig<Assets> = {
  assetId: KUSD.id,
  originSymbol: KUSD.originSymbol,
  originName: Karura_Alphanet.name,
  deposit: [
    {
      ...Karura_Alphanet,
      assetBalance: createTokensBalanceConfig<Assets>(KUSD.originSymbol),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmFeeBalance: {
        assetId: KAR.id,
        symbol: KAR.originSymbol,
      },
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transferMulticurrencies',
        successEvent: 'TransferredMultiCurrencies',
        params: [
          [
            [
              {
                Token: KUSD.originSymbol,
              },
              '%plankAmount%',
            ],
            [
              {
                Token: KAR.originSymbol,
              },
              '%xcmFeePlankAmount%',
            ],
          ],
          //feeItem
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
    createWithdrawConfig(Karura_Alphanet, {
      feePerWeight: 1,
      assetBalance: createTokensBalanceConfig<Assets>(KUSD.originSymbol),
    }),
  ],
};
