import { GATEWAY_CONTRACT_ADDRESS } from '../mrl/providers/snowbridge/contract/Gateway';
import { GATEWAY_ABI } from '../mrl/providers/snowbridge/contract/Gateway/GatewayAbi';
import { ContractConfig } from '../types';
import type { FeeConfigBuilder } from './FeeBuilder.interfaces';
import { xcmPaymentApi } from './xcmPaymentApi';

export function FeeBuilder() {
  return {
    xcmPaymentApi,
    quoteSendTokenFee,
  };
}

function quoteSendTokenFee(): FeeConfigBuilder {
  return {
    build: ({ asset }) => {
      if (!asset.address) {
        throw new Error(`Asset ${asset.key} has no address`);
      }

      return new ContractConfig({
        address: GATEWAY_CONTRACT_ADDRESS,
        abi: GATEWAY_ABI,
        args: [asset.address, 1, 0n],
        func: 'quoteSendTokenFee',
        module: 'Gateway', // TODO mjm Does it matter?
      });
    },
  };
}
