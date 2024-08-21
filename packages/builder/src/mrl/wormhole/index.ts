import { extrinsic } from './extrinsic';
import { wormhole as whBuilder } from './wormhole';

export function wormhole() {
  return {
    extrinsic,
    wormhole: whBuilder,
  };
}
