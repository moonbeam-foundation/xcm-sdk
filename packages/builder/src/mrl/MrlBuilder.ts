import { polkadotXcm } from './wormhole/extrinsic/polkadotXcm/polkadotXcm';
import { WormholeSdk } from './wormhole/WormholeSdk';

export function MrlBuilder() {
  return {
    wormhole() {
      return {
        extrinsic() {
          return { polkadotXcm };
        },
        WormholeSdk,
      };
    },
  };
}
