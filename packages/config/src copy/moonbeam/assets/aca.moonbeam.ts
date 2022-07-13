import { Assets, ACA } from '../assets.moonbeam';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Acala, PARACHAIN_ID } from '../chains.moonbeam';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const acaConfig: XcmConfig<Assets> = {
  assetId: ACA.id,
  originSymbol: ACA.originSymbol,
  originName: Acala.name,
  deposit: [
    {
      ...Acala,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          // currencyId
          {
            Token: ACA.originSymbol,
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
    createWithdrawConfig(Acala, {
      feePerWeight: 8,
      existentialDeposit: 100_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
