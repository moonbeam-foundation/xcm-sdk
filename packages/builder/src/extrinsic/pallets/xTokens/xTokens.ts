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
  };
}
