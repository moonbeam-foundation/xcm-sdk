import { Assets, AUSD } from '../assets.moonriver';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Karura, PARACHAIN_ID } from '../chains.moonriver';
import {
  createSystemBalanceConfig,
  createTokensBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const ausdConfig: XcmConfig<Assets> = {
  assetId: AUSD.id,
  originSymbol: AUSD.originSymbol,
  originName: Karura.name,
  deposit: [
    {
      ...Karura,
      assetBalance: createTokensBalanceConfig<Assets>('KUSD'),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        params: [
          {
            Token: 'KUSD',
          },
          '%plankAmount%',
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
        successEvent: 'TransferredMultiAssets',
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Karura, {
      feePerWeight: 64,
      existentialDeposit: 10_000_000_000,
      assetBalance: createTokensBalanceConfig<Assets>('KUSD'),
    }),
  ],
};
