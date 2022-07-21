import { PolkadotXcmPallet } from './polkadotXcm';
import { XcmPallet } from './xcmPallet';
import { XTokensPallet } from './xTokens';
import { XTransferPallet } from './xTransfer';

export type ExtrinsicConfig<Asset> =
  | PolkadotXcmPallet
  | XcmPallet
  | XTokensPallet<Asset>
  | XTransferPallet;
