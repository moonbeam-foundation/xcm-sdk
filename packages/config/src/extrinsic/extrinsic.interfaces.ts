import { Asset } from '../constants';
import { PolkadotXcmPallet } from './polkadotXcm';
import { XcmPallet } from './xcmPallet';
import { XTokensPallet } from './xTokens';
import { XTransferPallet } from './xTransfer';

export type ExtrinsicConfig<Assets extends Asset = Asset> =
  | PolkadotXcmPallet
  | XcmPallet
  | XTokensPallet<Assets>
  | XTransferPallet;
