import { ethereumTokenTransfers } from './ethereumTokenTransfer/ethereumTokenTransfers';
import { xcmPallet } from './xcmPallet/xcmPallet';

export function extrinsic() {
  return { ethereumTokenTransfers, xcmPallet };
}
