/* eslint-disable sort-keys */
import { ExtrinsicConfig } from '../../ExtrinsicConfig';
import { ExtrinsicConfigBuilder } from '../../ExtrinsicConfigBuilder.interfaces';

const pallet = 'xcmPallet';

export function xcmPallet() {
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
          func: 'limitedReserveTransferAssets',
          args: [],
        }),
    }),
  };
}
