import { eqBalances } from './pallets/eqBalances';
import { polkadotXcm } from './pallets/polkadotXcm';
import { xTokens } from './pallets/xTokens';
import { xTransfer } from './pallets/xTransfer';
import { xcmPallet } from './pallets/xcmPallet';

export function ExtrinsicBuilder() {
  return {
    eqBalances,
    xTokens,
    xTransfer,
    polkadotXcm,
    xcmPallet,
  };
}
