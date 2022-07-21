import { MoonChainConfig } from '../constants';
import { polkadotXcm } from './polkadotXcm';
import { xcmPallet } from './xcmPallet';
import { xTokens } from './xTokens';
import { xTransfer } from './xTransfer';

export function createExtrinsicBuilder<Assets>(config: MoonChainConfig) {
  return {
    polkadotXcm: () => polkadotXcm(config),
    xcmPallet: () => xcmPallet(config),
    xTokens: () => xTokens<Assets>(config),
    xTransfer: () => xTransfer(config),
  };
}
