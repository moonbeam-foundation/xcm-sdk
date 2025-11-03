import type { u128 } from '@polkadot/types';
import { GATEWAY_ABI } from '../mrl/providers/snowbridge/contract/Gateway/GatewayAbi';
import { GATEWAY_CONTRACT_ADDRESS } from '../mrl/providers/snowbridge/snowbridge/SnowbridgeConstants';
import { ContractConfig, SubstrateQueryConfig } from '../types';
import type { BridgeFeeConfigBuilder } from './FeeBuilder.interfaces';
import { xcmPaymentApi } from './xcmPaymentApi';

export function FeeBuilder() {
  return {
    xcmPaymentApi,
    quoteSendTokenFee,
    outboundQueueApiFee,
  };
}

// TODO mjm move from here, nest inside
// TODO mjm move to SnowbridgeConfig?
function quoteSendTokenFee(): BridgeFeeConfigBuilder {
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

// TODO mjm move from here, nest inside
function outboundQueueApiFee(): BridgeFeeConfigBuilder {
  return {
    build: ({ address, asset, balance }) => {
      const args = [
        {
          MintForeignToken: {
            tokenId: asset.getAssetId(),
            recipient: address,
            amount: balance?.amount,
          },
        },
        null,
      ];
      return new SubstrateQueryConfig({
        module: 'outboundQueueApi',
        func: 'calculateFee',
        args,
        queryType: 'call',
        transform: async (data: {
          local: u128;
          remote: u128;
        }): Promise<bigint> => data.local.toBigInt() + data.remote.toBigInt(),
      });
    },
  };
}
