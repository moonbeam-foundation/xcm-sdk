import { ethereumTokenTransfers } from './ethereumTokenTransfer/ethereumTokenTransfers';
import { polkadotXcm } from './polkadotXcm/polkadotXcm';
import { xcmPallet } from './xcmPallet/xcmPallet';

export function extrinsic() {
  return { ethereumTokenTransfers, xcmPallet, polkadotXcm };
}
