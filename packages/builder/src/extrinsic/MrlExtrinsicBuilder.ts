/* eslint-disable @typescript-eslint/no-use-before-define */

import { xTokens } from './mrl/wormhole/xTokens/xTokens';

export function MrlExtrinsicBuilder() {
  return {
    wormhole() {
      return {
        xTokens,
      };
    },
  };
}
