import { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';

const pallet = 'utility';
const func = 'batchAll';

export function utility() {
  return {
    batchAll: (): ExtrinsicConfigBuilder => ({
      build: () =>
        new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: (func) => [],
        }),
    }),
  };
}
