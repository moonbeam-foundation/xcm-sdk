import { Assets, AUSD } from '../assets.moonbeam';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Acala, PARACHAIN_ID } from '../chains.moonbeam';
import {
  createSystemBalanceConfig,
  createTokensBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const ausdConfig: XcmConfig<Assets> = {
  assetId: AUSD.id,
  originSymbol: AUSD.originSymbol,
  originName: Acala.name,
  deposit: [
    {
      ...Acala,
      assetBalance: createTokensBalanceConfig<Assets>(AUSD.originSymbol),
      extrinsicFeeBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        params: [
          {
            Token: AUSD.originSymbol,
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
    createWithdrawConfig(Acala, {
      feePerWeight: 64,
      existentialDeposit: 10_000_000_000,
      assetBalance: createTokensBalanceConfig<Assets>(AUSD.originSymbol),
    }),
  ],
};
