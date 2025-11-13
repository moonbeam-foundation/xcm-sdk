import type { u128 } from '@polkadot/types';
import { SubstrateQueryConfig } from '../../types';
import type { BridgeFeeConfigBuilder } from '../FeeBuilder.interfaces';

export function outboundQueueApi() {
  return {
    calculateFee: (): BridgeFeeConfigBuilder => {
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
            }): Promise<bigint> =>
              data.local.toBigInt() + data.remote.toBigInt(),
          });
        },
      };
    },
  };
}
