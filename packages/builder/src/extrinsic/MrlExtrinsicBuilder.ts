/* eslint-disable @typescript-eslint/no-use-before-define */

import { polkadotXcm } from './mrl/wormhole/polkadotXcm/polkadotXcm';

export function MrlExtrinsicBuilder() {
  return {
    wormhole() {
      return {
        polkadotXcm,
      };
    },
  };
}
