import { ExtrinsicPallet } from '../extrinsic.constants';
import { PolkadotXcmPallet } from '../polkadotXcm';

export interface XcmPallet extends Omit<PolkadotXcmPallet, 'pallet'> {
  pallet: ExtrinsicPallet.XcmPallet;
}
