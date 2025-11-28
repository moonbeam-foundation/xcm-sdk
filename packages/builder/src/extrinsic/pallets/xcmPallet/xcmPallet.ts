import { EvmChain } from '@moonbeam-network/xcm-types';
import { ExtrinsicConfig } from '../../../types/substrate/ExtrinsicConfig';
import {
  type ExtrinsicConfigBuilder,
  type Parents,
  XcmVersion,
} from '../../ExtrinsicBuilder.interfaces';
import {
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
  normalizeConcrete,
} from '../../ExtrinsicBuilder.utils';
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
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);
                return getPolkadotXcmExtrinsicArgs({
                  ...params,
                  parents,
                  func: extrinsicFunction,
                  assets: [
                    {
                      id: normalizeConcrete(version, {
                        parents: 0,
                        interior: 'Here',
                      }),
                      fun: {
                        Fungible: params.asset.amount,
                      },
                    },
                  ],
                });
              },
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
                          Fungible: params.asset.amount,
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
                              X1: [
                                getExtrinsicAccount(params.destinationAddress),
                              ],
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
    transferAssets: () => {
      const func = 'transferAssets';

      return {
        globalConsensus: (): ExtrinsicConfigBuilder => ({
          build: ({ destination, destinationAddress, asset }) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                if (!EvmChain.is(destination)) {
                  throw new Error('Destination must be an EVM chain');
                }

                const version = getExtrinsicArgumentVersion(extrinsicFunction);
                const dest = {
                  [version]: {
                    parents: 1,
                    interior: {
                      X1: [
                        {
                          GlobalConsensus: {
                            Ethereum: { chainId: destination.id },
                          },
                        },
                      ],
                    },
                  },
                };

                const beneficiary = {
                  [version]: {
                    parents: 0,
                    interior: {
                      X1: [
                        {
                          AccountKey20: {
                            network: { Ethereum: { chainId: destination.id } },
                            key: destinationAddress,
                          },
                        },
                      ],
                    },
                  },
                };

                const assets = {
                  [version]: [
                    {
                      id: {
                        parents: 1,
                        interior: {
                          X1: [
                            {
                              GlobalConsensus: {
                                Ethereum: { chainId: destination.id },
                              },
                            },
                          ],
                        },
                      },
                      fun: { Fungible: asset.amount },
                    },
                  ],
                };
                return [
                  dest,
                  beneficiary,
                  assets,
                  0, // feeAssetItem
                  'Unlimited',
                ];
              },
            }),
        }),
      };
    },
  };
}
