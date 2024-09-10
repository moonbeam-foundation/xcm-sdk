import { extrinsic } from './extrinsic';
import { contract } from './contract';
import { wormhole as whBuilder } from './wormhole';

export * from './wormhole/wormholeFactory';
export * from './wormhole/WormholeConfig';
export * from './extrinsic/ethereumXcm/BatchContractAbi';

export function wormhole() {
  return {
    contract,
    extrinsic,
    wormhole: whBuilder,
  };
}
