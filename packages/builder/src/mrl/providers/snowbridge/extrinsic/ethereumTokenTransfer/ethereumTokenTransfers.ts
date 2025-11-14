import { ExtrinsicConfig } from '../../../../../types';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';

const pallet = 'ethereumTokenTransfers';

export function ethereumTokenTransfers() {
  return {
    transferNativeToken: (): MrlConfigBuilder => {
      const func = 'transferNativeToken';
      const provider = 'snowbridge' as const;

      return {
        provider,
        build: ({ asset, destinationAddress }) => {
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
