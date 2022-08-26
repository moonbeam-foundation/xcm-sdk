import { Asset } from '../constants';
import { MoonChainConfig } from '../interfaces';
import { polkadotXcm } from './polkadotXcm';
import { xcmPallet } from './xcmPallet';
import { xTokens } from './xTokens';
import { xTransfer } from './xTransfer';

export function createExtrinsicBuilder<Assets extends Asset = Asset>(
  chain: MoonChainConfig,
) {
  return {
    polkadotXcm: () => polkadotXcm(chain),
    xcmPallet: () => xcmPallet(chain),
    xTokens: () => xTokens<Assets>(chain),
    xTransfer: () => xTransfer(chain),
  };
}
