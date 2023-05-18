/* eslint-disable sort-keys */
import { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicArgumentVersion } from '../../ExtrinsicBuilder.utils';
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
                      {
                        AccountKey20: {
                          network: 'Any',
                          key: address,
                        },
                      },
                    ],
                  },
                },
              },
              getWeight(source.weight, func),
            ];
          },
        }),
    }),
    transferMultiAsset: (
      originParachainId: number,
    ): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination, source }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'transferMultiAsset',
          getArgs: (func) => [
            {
              V1: {
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
              V1: {
                parents: 1,
                interior: {
                  X2: [
                    {
                      Parachain: destination.parachainId,
                    },
                    {
                      AccountKey20: {
                        network: 'Any',
                        key: address,
                      },
                    },
                  ],
                },
              },
            },
            getWeight(source.weight, func),
          ],
        }),
    }),
    transferMultiCurrencies: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination, fee, feeAsset, source }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'transferMultiCurrencies',
          getArgs: (func) => [
            [
              [asset, amount],
              [feeAsset, fee],
            ],
            1,
            {
              V1: {
                parents: 1,
                interior: {
                  X2: [
                    {
                      Parachain: destination.parachainId,
                    },
                    {
                      AccountKey20: {
                        network: 'Any',
                        key: address,
                      },
                    },
                  ],
                },
              },
            },
            getWeight(source.weight, func),
          ],
        }),
    }),
  };
}
