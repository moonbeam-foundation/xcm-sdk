import { Assets, PARA } from '../assets.moonbeam';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Parallel, PARACHAIN_ID } from '../chains.moonbeam';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const paraConfig: XcmConfig<Assets> = {
  assetId: PARA.id,
  originSymbol: PARA.originSymbol,
  originName: Parallel.name,
  deposit: [
    {
      ...Parallel,
      assetBalance: createSystemBalanceConfig(),
      xcmExtrinsic: <XTokensPallet<Assets>>{
        pallet: 'xTokens',
        extrinsic: 'transferMultiasset',
        successEvent: 'TransferredMultiAssets',
        params: [
          // asset
          {
            V1: {
              id: {
                Concrete: {
                  parents: 1,
                  interior: {
                    X2: [
                      {
                        Parachain: Parallel.parachainId,
                      },
                      {
                        GeneralKey: PARA.originSymbol,
                      },
                    ],
                  },
                },
              },
              fun: {
                Fungible: '%plankAmount%',
              },
            },
          },
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
          // weight
          '%weight%',
        ],
      },
    },
  ],
  withdraw: [
    createWithdrawConfig(Parallel, {
      feePerWeight: 16,
      existentialDeposit: 100_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
