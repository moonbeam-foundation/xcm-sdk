import type { u128 } from '@polkadot/types';
import { SubstrateQueryConfig } from '../../types';
import type { ProtocolFeeConfigBuilder } from '../FeeBuilder.interfaces';

export function outboundQueueApi() {
  return {
    calculateFee: () => ({
      mintForeignToken: (): ProtocolFeeConfigBuilder => ({
        build: ({ address, balance, feeAsset }) => {
          const args = [
            {
              MintForeignToken: {
                tokenId: feeAsset.getAssetId(),
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
      }),
      agentExecute: (): ProtocolFeeConfigBuilder => ({
        build: ({ address, balance, destination }) => {
          const assetInDestination = balance
            ? destination.getChainAsset(balance)
            : undefined;

          const args = [
            {
              AgentExecute: {
                agentId:
                  '0x0000000000000000000000000000000000000000000000000000000000000000', // actual value is not important
                TokenTransfer: {
                  tokenId: assetInDestination?.address,
                  recipient: address,
                  amount: balance?.amount,
                },
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
      }),
    }),
  };
}
