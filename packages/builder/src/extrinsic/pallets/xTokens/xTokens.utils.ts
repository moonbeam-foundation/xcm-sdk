import type { AnyParachain } from '@moonbeam-network/xcm-types';
import type { XcmVersion } from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicAccount } from '../../ExtrinsicBuilder.utils';
import type { XTokensWeightLimit } from './xTokens.interfaces';

/**
 * It is safer to always use unlimited
 */
export function getWeight(): XTokensWeightLimit {
  return 'Unlimited';
}

export function getDestination(
  version: XcmVersion,
  address: string,
  destination: AnyParachain,
) {
  return {
    [version]: {
      parents: 1,
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
