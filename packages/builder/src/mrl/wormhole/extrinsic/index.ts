import { ethereumXcm } from './ethereumXcm/ethereumXcm';
import { polkadotXcm } from './polkadotXcm/polkadotXcm';

export function extrinsic() {
  return { ethereumXcm, polkadotXcm };
}
