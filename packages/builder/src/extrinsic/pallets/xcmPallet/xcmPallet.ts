/* eslint-disable sort-keys */
import {
  ExtrinsicConfigBuilder,
  Parents,
  XcmVersion,
} from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicAccount } from '../../ExtrinsicBuilder.utils';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';
import { getPolkadotXcmExtrinsicArgs } from '../polkadotXcm/polkadotXcm.util';

const pallet = 'xcmPallet';

export function xcmPallet() {
  return {
    limitedReserveTransferAssets: (parents: Parents = 1) => {
      const func = 'limitedReserveTransferAssets';

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) =>
                getPolkadotXcmExtrinsicArgs({
                  ...params,
                  parents,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: {
                        Concrete: {
                          parents: 0,
                          interior: 'Here',
                        },
                      },
                      fun: {
                        Fungible: params.amount,
                      },
                    },
                  ],
                }),
            }),
        }),
      };
    },
    transferAssetsUsingTypeAndThen: () => {
      const func = 'transferAssetsUsingTypeAndThen';

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: () => {
                const version = XcmVersion.v4;
                return [
                  {
                    [version]: {
                      parents: 0,
                      interior: {
                        X1: [
                          {
                            Parachain: params.destination.parachainId,
                          },
                        ],
                      },
                    },
                  },
                  {
                    [version]: [
                      {
                        id: {
                          parents: 0,
                          interior: 'Here',
                        },
                        fun: {
                          Fungible: params.amount,
                        },
                      },
                    ],
                  },
                  'LocalReserve',
                  {
                    [version]: {
                      parents: 0,
                      interior: 'Here',
                    },
                  },
                  'LocalReserve',
                  {
                    [version]: [
                      {
                        DepositAsset: {
                          assets: {
                            Wild: { AllCounted: 1 },
                          },
                          beneficiary: {
                            parents: 0,
                            interior: {
                              X1: [getExtrinsicAccount(params.address)],
                            },
                          },
                        },
                      },
                    ],
                  },
                  'Unlimited',
                ];
              },
            }),
        }),
      };
    },
  };
}
