import { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';

export function xTokens() {
  return {
    transfer: (): ExtrinsicConfigBuilder => ({
      build: ({ api }) => {
        const asset1 = api.tx.xTokens.transfer();

        return new ExtrinsicConfig({
          module: 'utility',
          func: 'batchAll',
          getArgs: () => [],
        });
      },
    }),
  };
}
