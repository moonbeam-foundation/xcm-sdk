import { snowbridge } from './providers/snowbridge';
import { wormhole } from './providers/wormhole';

export function MrlBuilder() {
  return {
    snowbridge: () => ({ ...snowbridge(), provider: 'snowbridge' as const }),
    wormhole: () => ({ ...wormhole(), provider: 'wormhole' as const }),
  };
}
