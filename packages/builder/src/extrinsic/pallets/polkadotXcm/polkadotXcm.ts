/* eslint-disable sort-keys */
import {
  ExtrinsicConfigBuilder,
  XcmVersion,
} from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicAccount } from '../../ExtrinsicBuilder.utils';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';
import {
  getPolkadotXcmExtrinsicArgs,
  shouldFeeAssetPrecedeAsset,
} from './polkadotXcm.util';

const pallet = 'polkadotXcm';

export function polkadotXcm() {
  return {
    limitedReserveTransferAssets: () => {
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
        X1: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) =>
                getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: {
                        Concrete: {
                          parents: 0,
                          interior: {
                            X1: {
                              PalletInstance: params.palletInstance,
                            },
                          },
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
        X2: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const isAssetDifferent =
                  !!params.feeAsset && params.asset !== params.feeAsset;
                const assets = [
                  {
                    id: {
                      Concrete: {
                        parents: 0,
                        interior: {
                          X2: [
                            {
                              PalletInstance: params.palletInstance,
                            },
                            {
                              GeneralIndex: params.asset,
                            },
                          ],
                        },
                      },
                    },
                    fun: {
                      Fungible: params.amount,
                    },
                  },
                ];

                const shouldFeeAssetPrecede =
                  shouldFeeAssetPrecedeAsset(params);

                if (isAssetDifferent) {
                  const feeAsset = {
                    id: {
                      Concrete: {
                        parents: 0,
                        interior: {
                          X2: [
                            {
                              PalletInstance: params.palletInstance,
                            },
                            {
                              GeneralIndex: params.feeAsset,
                            },
                          ],
                        },
                      },
                    },
                    fun: {
                      Fungible: params.fee,
                    },
                  };

                  if (shouldFeeAssetPrecede) {
                    assets.unshift(feeAsset);
                  } else {
                    assets.push(feeAsset);
                  }
                }

                return getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: assets,
                  feeIndex: isAssetDifferent && !shouldFeeAssetPrecede ? 1 : 0,
                });
              },
            }),
        }),
      };
    },
    limitedReserveWithdrawAssets: () => {
      const func = 'limitedReserveWithdrawAssets';

      return {
        X2: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) =>
                getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: {
                        Concrete: {
                          parents: 1,
                          interior: {
                            X2: [
                              {
                                Parachain: params.destination.parachainId,
                              },
                              {
                                PalletInstance: params.palletInstance,
                              },
                            ],
                          },
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
    trasferAssets: () => {
      const func = 'transferAssets';

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) =>
                getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: {
                        Concrete: {
                          parents: 1,
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
        // TODO we could pass a parameter globalConcensus in the chain asset
        // but we can do it in V3
        globalConcensusEthereum: (): ExtrinsicConfigBuilder => ({
          build: ({ destination, address, amount, asset }) => {
            const version = XcmVersion.v4;
            return new ExtrinsicConfig({
              module: pallet,
              func,

              getArgs: () => [
                {
                  [version]: {
                    parents: 1,
                    interior: {
                      X1: [
                        {
                          Parachain: destination.parachainId,
                        },
                      ],
                    },
                  },
                },
                {
                  [version]: [
                    {
                      id: {
                        parents: 2,
                        interior: {
                          X2: [
                            { globalConsensus: { Ethereum: { ChainId: 1 } } },
                            getExtrinsicAccount(asset as string),
                          ],
                        },
                      },
                      fun: { fungible: amount },
                    },
                  ],
                },
                'LocalReserve',
                {
                  [version]: {
                    parents: 2,
                    interior: {
                      X2: [
                        { globalConsensus: { Ethereum: { ChainId: 1 } } },
                        getExtrinsicAccount(asset as string),
                      ],
                    },
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
                            X1: [getExtrinsicAccount(address)],
                          },
                        },
                      },
                    },
                  ],
                },
                'Unlimited',
              ],
            });
          },
        }),
      };
    },
  };
}
