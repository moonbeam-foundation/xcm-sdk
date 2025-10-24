import { snowbridge } from './providers/snowbridge';
import { wormhole } from './providers/wormhole';
// TODO mjm adjust this after moving. move to snowbridge
import { xcmPallet } from './providers/wormhole/extrinsic/xcmPallet/xcmPallet';

export function MrlBuilder() {
  return {
    snowbridge,
    wormhole,
    xcmPallet,
  };
}
