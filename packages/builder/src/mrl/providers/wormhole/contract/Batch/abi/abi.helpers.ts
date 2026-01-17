import type { EvmParachain } from '@moonbeam-network/xcm-types';
import { BATCH_ABI } from './BatchContractAbi';
import { XCM_UTILS_ABI } from './XcmUtilsContractAbi';
import { XTOKENS_ABI } from './XtokensContractAbi';

export function getAbisForChain(_: EvmParachain) {
  // TODO when we add more chains, find a way to handle Abis for the different chains, if the Abis differ

  return {
    BatchAbi: BATCH_ABI,
    XcmUtilsAbi: XCM_UTILS_ABI,
    XtokensAbi: XTOKENS_ABI,
  };
}
