import { Assets, TEER } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Integritee_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const teerConfig: XcmConfig<Assets> = {
  assetId: TEER.id,
  originSymbol: TEER.originSymbol,
  originName: Integritee_Alphanet.name,
  deposit: [
    {
      ...Integritee_Alphanet,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          // currencyId
          TEER.originSymbol,
          //amount
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
          // destWeight
          '%weight%',
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Integritee_Alphanet, {
      feePerWeight: 1,
      existentialDeposit: 1_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
