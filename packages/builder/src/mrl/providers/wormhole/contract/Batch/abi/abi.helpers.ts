import type { EvmParachain } from '@moonbeam-network/xcm-types';
import { PEAQ_BATCH_ABI } from './peaq/PeaqBatchContractAbi';
import { PEAQ_XCM_UTILS_ABI } from './peaq/PeaqXcmUtilsContractAbi';
import { PEAQ_XTOKENS_ABI } from './peaq/PeaqXtokensContractAbi';

export function getAbisForChain(chain: EvmParachain) {
  // TODO when we add more chains, find a way to handle Abis for the different chains, if the Abis differ
  return {
    BatchAbi: PEAQ_BATCH_ABI,
    XcmUtilsAbi: PEAQ_XCM_UTILS_ABI,
    XtokensAbi: PEAQ_XTOKENS_ABI,
  };
}
