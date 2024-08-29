import {
  ExtrinsicConfigBuilder,
  Parents,
} from '../../ExtrinsicBuilder.interfaces';
import { ExtrinsicConfig } from '../../../types/substrate/ExtrinsicConfig';
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
                        Fungible: params.asset.amount,
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
