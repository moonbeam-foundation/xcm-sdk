import { Assets, KAR } from '../assets.moonriver';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Karura, PARACHAIN_ID } from '../chains.moonriver';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const karConfig: XcmConfig<Assets> = {
  assetId: KAR.id,
  originSymbol: KAR.originSymbol,
  originName: Karura.name,
  deposit: [
    {
      ...Karura,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
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
          '%weight%',
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Karura, {
      feePerWeight: 8,
      existentialDeposit: 100_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
