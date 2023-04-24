/* eslint-disable sort-keys */
import { ExtrinsicConfig } from '../ExtrinsicConfig';
import { ExtrinsicConfigBuilder } from '../ExtrinsicConfigBuilder.interfaces';

export function xTokens() {
  return {
    asset: (): ExtrinsicConfigBuilder => ({
      build: ({ asset }) =>
        new ExtrinsicConfig({
          pallet: 'assets',
          method: 'asset',
          args: [asset],
        }),
    }),
  };
}
