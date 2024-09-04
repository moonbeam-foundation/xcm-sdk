import { extrinsic } from './extrinsic';
import { contract } from './contract';
import { wormhole as whBuilder } from './wormhole';

export function wormhole() {
  return {
    contract,
    extrinsic,
    wormhole: whBuilder,
  };
}
