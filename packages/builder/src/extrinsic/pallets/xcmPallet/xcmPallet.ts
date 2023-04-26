/* eslint-disable sort-keys */
import { ExtrinsicConfig } from '../../ExtrinsicConfig';
import { ExtrinsicConfigBuilder } from '../../ExtrinsicConfigBuilder.interfaces';
import { getPolkadotXcmExtrinsicArgs } from '../polkadotXcm/polkadotXcm.util';

const pallet = 'xcmPallet';

export function xcmPallet() {
  return {
    limitedReserveTransferAssets: () => {
      const func = 'limitedReserveTransferAssets';

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              pallet,
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
      };
    },
  };
}
