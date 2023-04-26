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
  if (!func) {
    return weight;
  }

  return func.meta.args.at(-1)?.type.eq('XcmV2WeightLimit')
    ? {
        Limited: weight,
      }
    : weight;
}
