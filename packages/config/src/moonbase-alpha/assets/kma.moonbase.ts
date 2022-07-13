import { Assets, KMA } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Calamari_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const kmaConfig: XcmConfig<Assets> = {
  assetId: KMA.id,
  originSymbol: KMA.originSymbol,
  originName: Calamari_Alphanet.name,
  deposit: [
    {
      ...Calamari_Alphanet,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transfer',
        successEvent: 'TransferredMultiAssets',
        params: [
          {
            MantaCurrency: 1,
          },
          '%plankAmount%',
          //dest
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
          // weight
          '%weight%',
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Calamari_Alphanet, {
      feePerWeight: 0.001,
      existentialDeposit: 100_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
