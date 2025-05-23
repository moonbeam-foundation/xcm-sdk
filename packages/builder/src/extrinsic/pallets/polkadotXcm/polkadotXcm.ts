import { ExtrinsicConfig } from '../../../types/substrate/ExtrinsicConfig';
import type { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import {
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
  normalizeConcrete,
  normalizeX1,
} from '../../ExtrinsicBuilder.utils';
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
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);
                return getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
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
        X1: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);

                return getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: normalizeConcrete(
                        version,
                        normalizeX1(version, {
                          parents: 0,
                          interior: {
                            X1: {
                              PalletInstance:
                                params.asset.getAssetPalletInstance(),
                            },
                          },
                        }),
                      ),
                      fun: {
                        Fungible: params.asset.amount,
                      },
                    },
                  ],
                });
              },
            }),
        }),
        X2: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const isAssetDifferent = !params.asset.isSame(params.fee);
                const version = getExtrinsicArgumentVersion(extrinsicFunction);

                const assets = [
                  {
                    id: normalizeConcrete(version, {
                      parents: 0,
                      interior: {
                        X2: [
                          {
                            PalletInstance:
                              params.asset.getAssetPalletInstance(),
                          },
                          {
                            GeneralIndex: params.asset.getAssetId(),
                          },
                        ],
                      },
                    }),
                    fun: {
                      Fungible: params.asset.amount,
                    },
                  },
                ];

                const shouldFeeAssetPrecede =
                  shouldFeeAssetPrecedeAsset(params);

                if (isAssetDifferent) {
                  const feeAsset = {
                    id: normalizeConcrete(version, {
                      parents: 0,
                      interior: {
                        X2: [
                          {
                            PalletInstance: params.fee.getAssetPalletInstance(),
                          },
                          {
                            GeneralIndex: params.fee.getAssetId(),
                          },
                        ],
                      },
                    }),
                    fun: {
                      Fungible: params.fee.amount,
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
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);

                return getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: normalizeConcrete(version, {
                        parents: 1,
                        interior: {
                          X2: [
                            {
                              Parachain: params.destination.parachainId,
                            },
                            {
                              PalletInstance:
                                params.asset.getAssetPalletInstance(),
                            },
                          ],
                        },
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
    transferAssets: () => {
      const func = 'transferAssets';

      return {
        here: (parents = 0): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);

                return getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: normalizeConcrete(version, {
                        parents,
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
        X2AndFeeHere: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);

                return getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: normalizeConcrete(version, {
                        parents: 0,
                        interior: {
                          X2: [
                            {
                              PalletInstance:
                                params.asset.getAssetPalletInstance(),
                            },
                            {
                              GeneralIndex: params.asset.getAssetId(),
                            },
                          ],
                        },
                      }),
                      fun: {
                        Fungible: params.asset.amount,
                      },
                    },
                    // Fee Asset
                    {
                      id: normalizeConcrete(version, {
                        parents: 1,
                        interior: 'Here',
                      }),
                      fun: {
                        Fungible: params.fee.amount,
                      },
                    },
                  ],
                  feeIndex: 1,
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
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);

                return [
                  {
                    [version]: {
                      parents: 1,
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
        // TODO we could pass a parameter globalConsensus in the chain asset if we need a different one
        globalConsensusEthereum: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,

              getArgs: (extrinsicFunction) => {
                if (!params.asset.address) {
                  throw new Error(
                    'Asset address is needed for transferAssetsUsingTypeAndThen.globalConsensus function',
                  );
                }

                const version = getExtrinsicArgumentVersion(extrinsicFunction);
                return [
                  {
                    [version]: {
                      parents: 1,
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
                        id: normalizeConcrete(version, {
                          parents: 2,
                          interior: {
                            X2: [
                              { globalConsensus: { Ethereum: { ChainId: 1 } } },
                              getExtrinsicAccount(params.asset.address),
                            ],
                          },
                        }),
                        fun: { fungible: params.asset.amount },
                      },
                    ],
                  },
                  'LocalReserve',
                  {
                    [version]: normalizeConcrete(version, {
                      parents: 2,
                      interior: {
                        X2: [
                          { globalConsensus: { Ethereum: { ChainId: 1 } } },
                          getExtrinsicAccount(params.asset.address),
                        ],
                      },
                    }),
                  },
                  'LocalReserve',
                  {
                    [version]: [
                      {
                        DepositAsset: {
                          assets: {
                            Wild: { AllCounted: 1 },
                          },
                          beneficiary: normalizeX1(version, {
                            parents: 0,
                            interior: {
                              X1: getExtrinsicAccount(
                                params.destinationAddress,
                              ),
                            },
                          }),
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
    transferAssetsToEcosystem: () => {
      const func = 'transferAssets';

      return {
        byGenesis: (): ExtrinsicConfigBuilder => ({
          build: (params) => {
            return new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);

                // TODO mjm
                const genesis =
                  params.destination.key === 'moonbase-stage'
                    ? '0x64d25a5d58d8d330b8804103e6452be6258ebfd7c4f4c1294835130e75628401'
                    : '0xe1ea3ab1d46ba8f4898b6b4b9c54ffc05282d299f89e84bd0fd08067758c9443';

                return [
                  // dest
                  {
                    [version]: normalizeX1(version, {
                      parents: 2,
                      interior: {
                        X2: [
                          {
                            GlobalConsensus: {
                              ByGenesis: genesis, // Relay of destination ecosystem
                            },
                          },
                          {
                            Parachain: params.destination.parachainId,
                          },
                        ],
                      },
                    }),
                  },
                  // beneficiary
                  {
                    [version]: normalizeX1(version, {
                      parents: 0,
                      interior: {
                        X1: getExtrinsicAccount(params.destinationAddress),
                      },
                    }),
                  },
                  // assets
                  {
                    [version]: {
                      id: normalizeConcrete(
                        version,
                        normalizeX1(version, {
                          parents: 0,
                          interior: {
                            X1: {
                              PalletInstance:
                                params.asset.getAssetPalletInstance(),
                            },
                          },
                        }),
                      ),
                      fun: {
                        Fungible: params.asset.amount,
                      },
                    },
                  },
                  // feeAssetItem
                  0,
                  // weightLimit
                  'Unlimited',
                ];
              },
            });
          },
        }),
      };
    },
  };
}
