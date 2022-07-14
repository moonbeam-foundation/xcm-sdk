import { polkadotXcm } from './polkadotXcm';
import { xTokens } from './xTokens';
import { xTransfer } from './xTransfer';

export const extrinsic = <const>{
  polkadotXcm,
  xTokens,
  xTransfer,
};
