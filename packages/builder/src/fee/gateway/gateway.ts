import { ContractConfig } from '../..';
import {
  ASSET_HUB_PARA_ID,
  GATEWAY_ABI,
  GATEWAY_CONTRACT_ADDRESS,
} from '../../mrl/providers/snowbridge/snowbridge/SnowbridgeConstants';
import type { BridgeFeeConfigBuilder } from '../FeeBuilder.interfaces';

// TODO mjm tests for this?
export function gateway() {
  return {
    quoteSendTokenFee(): BridgeFeeConfigBuilder {
      return {
        build: ({ asset }) => {
          if (!asset.address) {
            throw new Error(`Asset ${asset.key} has no address`);
          }

          return new ContractConfig({
            address: GATEWAY_CONTRACT_ADDRESS,
            abi: GATEWAY_ABI,
            args: [asset.address, ASSET_HUB_PARA_ID, 0n],
            func: 'quoteSendTokenFee',
            module: 'Gateway',
          });
        },
      };
    },
  };
}
