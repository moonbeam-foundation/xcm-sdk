import { eqBalances } from './pallets/eqBalances';
import { polkadotXcm } from './pallets/polkadotXcm';
import { xcmPallet } from './pallets/xcmPallet';
import { xTokens } from './pallets/xTokens';
import { xTransfer } from './pallets/xTransfer';

export function ExtrinsicBuilder() {
  return {
    eqBalances,
    xTokens,
    xTransfer,
    polkadotXcm,
    xcmPallet,
  };
}
