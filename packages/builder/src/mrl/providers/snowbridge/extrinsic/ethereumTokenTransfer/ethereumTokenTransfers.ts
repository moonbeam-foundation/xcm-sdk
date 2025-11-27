import { ExtrinsicConfig } from '../../../../../types';
import {
  type MrlConfigBuilder,
  Provider,
} from '../../../../MrlBuilder.interfaces';

const pallet = 'ethereumTokenTransfers';

export function ethereumTokenTransfers() {
  return {
    transferNativeToken: (): MrlConfigBuilder => {
      const func = 'transferNativeToken';
      const provider = Provider.Snowbridge;

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
