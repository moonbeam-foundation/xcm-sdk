import { contract } from './contract';
import { extrinsic } from './extrinsic';
import { wormhole as whBuilder } from './wormhole';

export * from './extrinsic/ethereumXcm/BatchContractAbi';
export * from './wormhole/WormholeConfig';
export * from './wormhole/wormholeFactory';

export function wormhole() {
  return {
    contract,
    extrinsic,
    wormhole: whBuilder,
  };
}
