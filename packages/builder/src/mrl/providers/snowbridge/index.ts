import { contract } from './contract';
import { extrinsic } from './extrinsic';

export function snowbridge() {
  return {
    contract,
    extrinsic,
  };
}
