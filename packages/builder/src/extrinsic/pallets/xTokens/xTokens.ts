/* eslint-disable sort-keys */
import { ExtrinsicConfig } from '../../ExtrinsicConfig';
import { ExtrinsicConfigBuilder } from '../../ExtrinsicConfigBuilder.interfaces';
import { getWeight } from './xTokens.utils';

const pallet = 'xTokens';

export function xTokens() {
  return {
    transfer: (): ExtrinsicConfigBuilder => ({
      build: ({
        address,
        amount,
        asset,
        destination,
        extrinsicFunction,
        source,
      }) =>
        new ExtrinsicConfig({
          pallet,
          method: 'transfer',
          args: [
            asset,
            amount,
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
            getWeight(source.weight, extrinsicFunction),
          ],
        }),
    }),
    transferMultiAsset: (): ExtrinsicConfigBuilder => ({
      build: ({
        address,
        amount,
        asset,
        destination,
        extrinsicFunction,
        origin,
        source,
      }) =>
        new ExtrinsicConfig({
          pallet,
          method: 'transferMultiAsset',
          args: [
            {
              V1: {
                id: {
                  Concrete: {
                    parents: 1,
                    interior: {
                      X2: [
                        {
                          Parachain: origin.parachainId,
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
            getWeight(source.weight, extrinsicFunction),
          ],
        }),
    }),
    transferMultiCurrencies: (): ExtrinsicConfigBuilder => ({
      build: ({
        address,
        amount,
        asset,
        destination,
        extrinsicFunction,
        fee,
        feeAsset,
        source,
      }) =>
        new ExtrinsicConfig({
          pallet,
          method: 'transferMultiCurrencies',
          args: [
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
            getWeight(source.weight, extrinsicFunction),
          ],
        }),
    }),
  };
}
