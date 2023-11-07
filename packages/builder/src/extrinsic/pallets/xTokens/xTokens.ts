/* eslint-disable sort-keys */
import {
  ExtrinsicConfigBuilder,
  XcmVersion,
} from '../../ExtrinsicBuilder.interfaces';
import {
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
} from '../../ExtrinsicBuilder.utils';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';
import { getWeight } from './xTokens.utils';

const pallet = 'xTokens';

export function xTokens() {
  return {
    transfer: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination, source }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'transfer',
          getArgs: (func) => {
            const version = getExtrinsicArgumentVersion(func, 2);

            return [
              asset,
              amount,
              {
                [version]: {
                  parents: 1,
                  interior: {
                    X2: [
                      {
                        Parachain: destination.parachainId,
                      },
                      getExtrinsicAccount(address),
                    ],
                  },
                },
              },
              getWeight(source.weight, func),
            ];
          },
        }),
    }),
    transferMultiAsset: (originParachainId: number) => {
      const funcName = 'transferMultiasset';

      return {
        X1: (): ExtrinsicConfigBuilder => ({
          build: ({ address, amount, destination }) =>
            new ExtrinsicConfig({
              module: pallet,
              func: funcName,
              getArgs: (func) => {
                const version = getExtrinsicArgumentVersion(func, 1);

                return [
                  {
                    [version]: {
                      id: {
                        Concrete: {
                          parents: 1,
                          interior: {
                            X1: {
                              Parachain: originParachainId,
                            },
                          },
                        },
                      },
                      fun: {
                        Fungible: amount,
                      },
                    },
                  },
                  {
                    [version]: {
                      parents: 1,
                      interior: {
                        X2: [
                          {
                            Parachain: destination.parachainId,
                          },
                          getExtrinsicAccount(address),
                        ],
                      },
                    },
                  },
                  'Unlimited',
                ];
              },
            }),
        }),
        X2: (): ExtrinsicConfigBuilder => ({
          build: ({ address, amount, asset, destination, source }) =>
            new ExtrinsicConfig({
              module: pallet,
              func: funcName,
              getArgs: (func) => {
                const version = getExtrinsicArgumentVersion(func, 1);

                return [
                  {
                    [version]: {
                      id: {
                        Concrete: {
                          parents: 1,
                          interior: {
                            X2: [
                              {
                                Parachain: originParachainId,
                              },
                              {
                                GeneralKey: asset,
                              },
                            ],
                          },
                        },
                      },
                      fun: {
                        Fungible: amount,
                      },
                    },
                  },
                  {
                    [version]: {
                      parents: 1,
                      interior: {
                        X2: [
                          {
                            Parachain: destination.parachainId,
                          },
                          getExtrinsicAccount(address),
                        ],
                      },
                    },
                  },
                  getWeight(source.weight, func),
                ];
              },
            }),
        }),
      };
    },
    transferMultiCurrencies: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination, fee, feeAsset }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'transferMulticurrencies',
          getArgs: () => [
            [
              [asset, amount],
              [feeAsset, fee],
            ],
            1,
            {
              [XcmVersion.v3]: {
                parents: 1,
                interior: {
                  X2: [
                    {
                      Parachain: destination.parachainId,
                    },
                    getExtrinsicAccount(address),
                  ],
                },
              },
            },
            'Unlimited',
          ],
        }),
    }),
  };
}
