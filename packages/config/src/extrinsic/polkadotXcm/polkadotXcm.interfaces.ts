import {
  XcmPallet,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from '../extrinsic.constants';
import { PolkadotXcmPalletParams } from '../extrinsic.interfaces';

export interface PolkadotXcmPallet {
  pallet: XcmPallet.PolkadotXcm;
  extrinsic: PolkadotXcmExtrinsic;
  successEvent: PolkadotXcmExtrinsicSuccessEvent;
  getParams: (account: string, amount: bigint) => PolkadotXcmPalletParams;
}
