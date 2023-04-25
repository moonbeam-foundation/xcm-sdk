/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { xTokens } from './pallets/xTokens';
import { xTransfer } from './pallets/xTransfer';

export function ExtrinsicBuilder() {
  return {
    xTokens,
    xTransfer,
  };
}
