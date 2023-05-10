import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { XTokensWeightLimit } from './xTokens.interfaces';

/**
 * Workaround for weight parameter type change in xTokens pallet
 * https://github.com/open-web3-stack/open-runtime-module-library/pull/841
 */
export function getWeight(
  weight: number,
  func?: SubmittableExtrinsicFunction<'promise'>,
): XTokensWeightLimit {
  const type = func?.meta.args.at(-1)?.type;

  if (!type) {
    return weight;
  }

  if (type.eq('XcmV2WeightLimit')) {
    return {
      Limited: weight,
    };
  }

  if (type.eq('XcmV3WeightLimit')) {
    return {
      Limited: { proofSize: 0, refTime: weight },
    };
  }

  return weight;
}
