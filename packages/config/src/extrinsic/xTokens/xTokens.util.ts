import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { XTokensWeightLimit } from './xTokens.interfaces';

/**
 * Workaround for weight parameter type change in xTokens pallet
 * https://github.com/open-web3-stack/open-runtime-module-library/pull/841
 */
export function getXTokensWeight(
  weight: number,
  extrinsicCall?: SubmittableExtrinsicFunction<'promise'>,
): XTokensWeightLimit {
  const type = extrinsicCall?.meta.args.at(-1)?.type;

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
      Limited: { refTime: weight, proofSize: 0 },
    };
  }

  return weight;
}
