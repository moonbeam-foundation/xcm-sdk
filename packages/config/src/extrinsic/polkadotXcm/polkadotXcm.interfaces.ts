import {
  Pallet,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from '../extrinsic.constants';
import { PolkadotXcmPalletParams } from '../extrinsic.interfaces';

export interface PolkadotXcmPallet {
  pallet: Pallet.PolkadotXcm;
  extrinsic: PolkadotXcmExtrinsic;
  successEvent: PolkadotXcmExtrinsicSuccessEvent;
  getParams: (account: string, amount: bigint) => PolkadotXcmPalletParams;
}
