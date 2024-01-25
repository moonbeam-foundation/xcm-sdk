import { AnyChain } from '@moonbeam-network/xcm-types';
import { XcmVersion } from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicAccount } from '../../ExtrinsicBuilder.utils';
import { XTokensWeightLimit } from './xTokens.interfaces';

/**
 * It is safer to always use unlimited
 */
export function getWeight(): XTokensWeightLimit {
  return 'Unlimited';
}

export function getDestination(
  version: XcmVersion,
  address: string,
  destination: AnyChain,
) {
  return {
    [version]: {
      parents: 1,
      // eslint-disable-next-line sort-keys
      interior: {
        X2: [
          {
            Parachain: destination.parachainId,
          },
          getExtrinsicAccount(address),
        ],
      },
    },
  };
}
