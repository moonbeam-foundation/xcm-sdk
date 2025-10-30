import { ExtrinsicConfig } from '../../../../../types';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';

const pallet = 'ethereumTokenTransfers';

export function ethereumTokenTransfers() {
  return {
    transferNativeToken: (): MrlConfigBuilder => {
      const func = 'transferNativeToken';

      return {
        build: ({ asset, destinationAddress }) => {
          console.log('building transferAssets extrinsic');

          return new ExtrinsicConfig({
            module: pallet,
            func,
            getArgs: () => [asset.amount, destinationAddress],
          });
        },
      };
    },
  };
}
