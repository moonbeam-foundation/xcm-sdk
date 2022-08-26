import { AssetSymbol } from '../constants';
import { MoonChain } from '../interfaces';
import { polkadotXcm } from './polkadotXcm';
import { xcmPallet } from './xcmPallet';
import { xTokens } from './xTokens';
import { xTransfer } from './xTransfer';

export function createExtrinsicBuilder<
  Symbols extends AssetSymbol = AssetSymbol,
>(chain: MoonChain) {
  return {
    polkadotXcm: () => polkadotXcm(chain),
    xcmPallet: () => xcmPallet(chain),
    xTokens: () => xTokens<Symbols>(chain),
    xTransfer: () => xTransfer(chain),
  };
}
