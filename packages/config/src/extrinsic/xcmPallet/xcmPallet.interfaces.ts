import {
  Pallet,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from '../extrinsic.constants';
import { PolkadotXcmPalletParams } from '../extrinsic.interfaces';

export interface XcmPallet {
  pallet: Pallet.XcmPallet;
  extrinsic: PolkadotXcmExtrinsic.LimitedReserveTransferAssets;
  successEvent: PolkadotXcmExtrinsicSuccessEvent;
  params: PolkadotXcmPalletParams;
}
