import { XcmPrecompile } from './contracts/XcmPrecompile';
import { Xtokens } from './contracts/Xtokens';

export function ContractBuilder() {
  return {
    Xtokens,
    XcmPrecompile,
  };
}
