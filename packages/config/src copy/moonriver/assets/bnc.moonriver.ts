import { Assets, BNC } from '../assets.moonriver';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Bifrost, PARACHAIN_ID } from '../chains.moonriver';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const bncConfig: XcmConfig<Assets> = {
  assetId: BNC.id,
  originSymbol: BNC.originSymbol,
  originName: Bifrost.name,
  deposit: [
    {
      ...Bifrost,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          // currencyId
          {
            Native: BNC.originSymbol,
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
    createWithdrawConfig(Bifrost, {
      feePerWeight: 6.4,
      existentialDeposit: 10_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
