import { contract } from './contract';
import { extrinsic } from './extrinsic';

export * from './snowbridge';

export function snowbridge() {
  return {
    contract,
    extrinsic,
  };
}
