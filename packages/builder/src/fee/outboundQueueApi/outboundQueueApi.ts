import type { u128 } from '@polkadot/types';
import { SubstrateQueryConfig } from '../../types';
import type { FeeConfigBuilder } from '../FeeBuilder.interfaces';

export function outboundQueueApi() {
  return {
    calculateFee: (): FeeConfigBuilder => {
      return {
        build: ({ address, balance, feeAsset }) => {
          console.log('address', address);
          console.log('balance', balance);
          console.log('feeAsset', feeAsset);
          const args = [
            {
              MintForeignToken: {
                tokenId: feeAsset.getAssetId(),
                recipient: address,
                amount: balance?.amount || 0n,
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
