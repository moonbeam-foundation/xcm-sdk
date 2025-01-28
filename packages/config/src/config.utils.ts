import {
  type AnyAsset,
  type AnyChain,
  Ecosystem,
  type EvmParachain,
} from '@moonbeam-network/xcm-types';
import { moonbaseAlpha, moonbeam, moonriver } from './chains';

export function getKey(keyOrModel: string | AnyAsset | AnyChain): string {
  if (typeof keyOrModel === 'string') {
    return keyOrModel;
  }

  return keyOrModel.key;
}

export function getMoonChain(chain: AnyChain): EvmParachain {
  switch (chain.ecosystem) {
    case Ecosystem.AlphanetRelay:
      return moonbaseAlpha;

    case Ecosystem.Kusama:
      return moonriver;

    default:
      return moonbeam;
  }
}
