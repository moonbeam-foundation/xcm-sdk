import { AnyAsset, AnyChain } from '@moonbeam-network/xcm-types';

export function getKey(keyOrModel: string | AnyAsset | AnyChain): string {
  if (typeof keyOrModel === 'string') {
    return keyOrModel;
  }

  return keyOrModel.key;
}
