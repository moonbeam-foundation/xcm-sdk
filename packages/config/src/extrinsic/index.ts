import { MoonChainConfig } from '../constants';
import { polkadotXcm } from './polkadotXcm';
import { xTokens } from './xTokens';
import { xTransfer } from './xTransfer';

export function createExtrinsicBuilder<Assets>(config: MoonChainConfig) {
  return {
    polkadotXcm: () => polkadotXcm<Assets>(config),
    xTokens: () => xTokens<Assets>(config),
    xTransfer: () => xTransfer<Assets>(config),
  };
}
