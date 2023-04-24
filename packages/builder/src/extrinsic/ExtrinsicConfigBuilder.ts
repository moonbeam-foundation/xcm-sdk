/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { xTokens } from './pallets/xTokens';

export function ExtrinsicBuilder() {
  return {
    xTokens,
  };
}
