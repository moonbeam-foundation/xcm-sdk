import { Assets, HKO } from '../assets.moonbase';
import { XcmConfig } from '../../interfaces/xcm-config.interfaces';
import { Parallel_Alphanet, PARACHAIN_ID } from '../chains.moonbase';
import {
  createSystemBalanceConfig,
  createWithdrawConfig,
} from '../../xcm-config.utils';
import { XTokensPallet } from '../../interfaces/XTokensPallet.interface';

export const hkoConfig: XcmConfig<Assets> = {
  assetId: HKO.id,
  originSymbol: HKO.originSymbol,
  originName: Parallel_Alphanet.name,
  deposit: [
    {
      ...Parallel_Alphanet,
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
                        Parachain: Parallel_Alphanet.parachainId,
                      },
                      {
                        GeneralKey: HKO.originSymbol,
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
    createWithdrawConfig(Parallel_Alphanet, {
      feePerWeight: 4.8,
      existentialDeposit: 10_000_000_000,
      assetBalance: createSystemBalanceConfig(),
    }),
  ],
};
