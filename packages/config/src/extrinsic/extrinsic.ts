import { AssetSymbol, ChainKey } from '../constants';
import { MoonChain } from '../interfaces';
import { polkadotXcm } from './polkadotXcm';
import { xcmPallet } from './xcmPallet';
import { xTokens } from './xTokens';
import { xTransfer } from './xTransfer';

export function createExtrinsicBuilder<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>(chain: MoonChain) {
  return {
    polkadotXcm: () => polkadotXcm<ChainKeys>(chain),
    xcmPallet: () => xcmPallet<ChainKeys>(chain),
    xTokens: () => xTokens<Symbols, ChainKeys>(chain),
    xTransfer: () => xTransfer<ChainKeys>(chain),
  };
}
