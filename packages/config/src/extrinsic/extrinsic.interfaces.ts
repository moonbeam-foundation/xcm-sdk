import { AssetSymbol } from '../constants';
import { PolkadotXcmPallet } from './polkadotXcm';
import { XcmPallet } from './xcmPallet';
import { XTokensPallet } from './xTokens';
import { XTransferPallet } from './xTransfer';

export type ExtrinsicConfig<Symbols extends AssetSymbol = AssetSymbol> =
  | PolkadotXcmPallet
  | XcmPallet
  | XTokensPallet<Symbols>
  | XTransferPallet;
