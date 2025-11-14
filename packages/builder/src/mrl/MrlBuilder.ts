import { snowbridge } from './providers/snowbridge';
import { wormhole } from './providers/wormhole';

export function MrlBuilder() {
  return {
    snowbridge,
    wormhole,
  };
}
