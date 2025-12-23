import type { u128 } from '@polkadot/types';
import { describe, expect, it } from 'vitest';
import { feeBuilderParamsMock, testAssetAmount2 } from '../../../fixtures';
import { SubstrateQueryConfig } from '../../types';
import type { ProtocolFeeConfigBuilderParams } from '../FeeBuilder.interfaces';
import { outboundQueueApi } from './outboundQueueApi';

describe('outboundQueueApi', () => {
  const protocolFeeParams: ProtocolFeeConfigBuilderParams = {
    address: feeBuilderParamsMock.address,
    asset: feeBuilderParamsMock.feeAsset,
    balance: feeBuilderParamsMock.balance,
    bridgeChainFee: testAssetAmount2,
    destination: feeBuilderParamsMock.destination,
    feeAsset: feeBuilderParamsMock.feeAsset,
    source: feeBuilderParamsMock.source,
  };

  describe('calculateFee', () => {
    it('should return a ProtocolFeeConfigBuilder', () => {
      const result = outboundQueueApi().calculateFee().mintForeignToken();

      expect(result).toHaveProperty('build');
      expect(typeof result.build).toBe('function');
    });

    it('should build a SubstrateQueryConfig with correct module and function', () => {
      const builder = outboundQueueApi().calculateFee().mintForeignToken();
      const config = builder.build(protocolFeeParams);

      expect(config).toBeInstanceOf(SubstrateQueryConfig);

      if (config instanceof SubstrateQueryConfig) {
        expect(config.module).toBe('outboundQueueApi');
        expect(config.func).toBe('calculateFee');
        expect(config.queryType).toBe('call');
      }
    });

    it('should generate correct args structure', () => {
      const builder = outboundQueueApi().calculateFee().mintForeignToken();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        expect(config.args).toHaveLength(2);
        expect(config.args[0] as any).toHaveProperty('MintForeignToken');
        expect((config.args[0] as any).MintForeignToken).toHaveProperty(
          'tokenId',
        );
        expect((config.args[0] as any).MintForeignToken).toHaveProperty(
          'recipient',
        );
        expect((config.args[0] as any).MintForeignToken).toHaveProperty(
          'amount',
        );
        expect(config.args[1]).toBeNull();
      }
    });

    it('should use correct tokenId from feeAsset', () => {
      const builder = outboundQueueApi().calculateFee().mintForeignToken();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        const mintForeignToken = (config.args[0] as any).MintForeignToken;
        expect(mintForeignToken.tokenId).toBe(
          protocolFeeParams.feeAsset.getAssetId(),
        );
      }
    });

    it('should use correct recipient address', () => {
      const builder = outboundQueueApi().calculateFee().mintForeignToken();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        const mintForeignToken = (config.args[0] as any).MintForeignToken;
        expect(mintForeignToken.recipient).toBe(protocolFeeParams.address);
      }
    });

    it('should use balance amount from params', () => {
      const builder = outboundQueueApi().calculateFee().mintForeignToken();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        const mintForeignToken = (config.args[0] as any).MintForeignToken;
        expect(mintForeignToken.amount).toBe(protocolFeeParams.balance?.amount);
      }
    });

    it('should match args snapshot', () => {
      const builder = outboundQueueApi().calculateFee().mintForeignToken();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        expect(config.args).toMatchSnapshot();
      }
    });

    describe('transform function', () => {
      it('should sum local and remote fees', async () => {
        const builder = outboundQueueApi().calculateFee().mintForeignToken();
        const config = builder.build(protocolFeeParams);

        if (config instanceof SubstrateQueryConfig) {
          const mockData = {
            local: {
              toBigInt: () => 1000n,
            } as u128,
            remote: {
              toBigInt: () => 2000n,
            } as u128,
          };

          const result = await config.transform(mockData);
          expect(result).toBe(3000n);
        }
      });

      it('should handle zero local fee', async () => {
        const builder = outboundQueueApi().calculateFee().mintForeignToken();
        const config = builder.build(protocolFeeParams);

        if (config instanceof SubstrateQueryConfig) {
          const mockData = {
            local: {
              toBigInt: () => 0n,
            } as u128,
            remote: {
              toBigInt: () => 5000n,
            } as u128,
          };

          const result = await config.transform(mockData);
          expect(result).toBe(5000n);
        }
      });

      it('should handle zero remote fee', async () => {
        const builder = outboundQueueApi().calculateFee().mintForeignToken();
        const config = builder.build(protocolFeeParams);

        if (config instanceof SubstrateQueryConfig) {
          const mockData = {
            local: {
              toBigInt: () => 3000n,
            } as u128,
            remote: {
              toBigInt: () => 0n,
            } as u128,
          };

          const result = await config.transform(mockData);
          expect(result).toBe(3000n);
        }
      });

      it('should handle large fee values', async () => {
        const builder = outboundQueueApi().calculateFee().mintForeignToken();
        const config = builder.build(protocolFeeParams);

        if (config instanceof SubstrateQueryConfig) {
          const mockData = {
            local: {
              toBigInt: () => 999_999_999_999_999n,
            } as u128,
            remote: {
              toBigInt: () => 888_888_888_888_888n,
            } as u128,
          };

          const result = await config.transform(mockData);
          expect(result).toBe(1_888_888_888_888_887n);
        }
      });
    });
  });

  describe('agentExecute', () => {
    it('should return a ProtocolFeeConfigBuilder', () => {
      const result = outboundQueueApi().calculateFee().agentExecute();

      expect(result).toHaveProperty('build');
      expect(typeof result.build).toBe('function');
    });

    it('should build a SubstrateQueryConfig with correct module and function', () => {
      const builder = outboundQueueApi().calculateFee().agentExecute();
      const config = builder.build(protocolFeeParams);

      expect(config).toBeInstanceOf(SubstrateQueryConfig);

      if (config instanceof SubstrateQueryConfig) {
        expect(config.module).toBe('outboundQueueApi');
        expect(config.func).toBe('calculateFee');
        expect(config.queryType).toBe('call');
      }
    });

    it('should generate correct args structure', () => {
      const builder = outboundQueueApi().calculateFee().agentExecute();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        expect(config.args).toHaveLength(2);
        expect(config.args[0] as any).toHaveProperty('AgentExecute');
        expect((config.args[0] as any).AgentExecute).toHaveProperty('agentId');
        expect((config.args[0] as any).AgentExecute).toHaveProperty(
          'TokenTransfer',
        );
        expect(
          (config.args[0] as any).AgentExecute.TokenTransfer,
        ).toHaveProperty('tokenId');
        expect(
          (config.args[0] as any).AgentExecute.TokenTransfer,
        ).toHaveProperty('recipient');
        expect(
          (config.args[0] as any).AgentExecute.TokenTransfer,
        ).toHaveProperty('amount');
        expect(config.args[1]).toBeNull();
      }
    });

    it('should use correct agentId', () => {
      const builder = outboundQueueApi().calculateFee().agentExecute();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        const agentExecute = (config.args[0] as any).AgentExecute;
        expect(agentExecute.agentId).toBe(
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        );
      }
    });

    it('should use correct tokenId from destination chain asset', () => {
      const builder = outboundQueueApi().calculateFee().agentExecute();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        const tokenTransfer = (config.args[0] as any).AgentExecute
          .TokenTransfer;
        const expectedAsset = protocolFeeParams.balance
          ? protocolFeeParams.destination.getChainAsset(
              protocolFeeParams.balance,
            )
          : undefined;
        expect(tokenTransfer.tokenId).toBe(expectedAsset?.address);
      }
    });

    it('should use correct recipient address', () => {
      const builder = outboundQueueApi().calculateFee().agentExecute();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        const tokenTransfer = (config.args[0] as any).AgentExecute
          .TokenTransfer;
        expect(tokenTransfer.recipient).toBe(protocolFeeParams.address);
      }
    });

    it('should use balance amount from params', () => {
      const builder = outboundQueueApi().calculateFee().agentExecute();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        const tokenTransfer = (config.args[0] as any).AgentExecute
          .TokenTransfer;
        expect(tokenTransfer.amount).toBe(protocolFeeParams.balance?.amount);
      }
    });

    it('should match args snapshot', () => {
      const builder = outboundQueueApi().calculateFee().agentExecute();
      const config = builder.build(protocolFeeParams);

      if (config instanceof SubstrateQueryConfig) {
        expect(config.args).toMatchSnapshot();
      }
    });

    describe('transform function', () => {
      it('should sum local and remote fees', async () => {
        const builder = outboundQueueApi().calculateFee().agentExecute();
        const config = builder.build(protocolFeeParams);

        if (config instanceof SubstrateQueryConfig) {
          const mockData = {
            local: {
              toBigInt: () => 1000n,
            } as u128,
            remote: {
              toBigInt: () => 2000n,
            } as u128,
          };

          const result = await config.transform(mockData);
          expect(result).toBe(3000n);
        }
      });

      it('should handle zero local fee', async () => {
        const builder = outboundQueueApi().calculateFee().agentExecute();
        const config = builder.build(protocolFeeParams);

        if (config instanceof SubstrateQueryConfig) {
          const mockData = {
            local: {
              toBigInt: () => 0n,
            } as u128,
            remote: {
              toBigInt: () => 5000n,
            } as u128,
          };

          const result = await config.transform(mockData);
          expect(result).toBe(5000n);
        }
      });

      it('should handle zero remote fee', async () => {
        const builder = outboundQueueApi().calculateFee().agentExecute();
        const config = builder.build(protocolFeeParams);

        if (config instanceof SubstrateQueryConfig) {
          const mockData = {
            local: {
              toBigInt: () => 3000n,
            } as u128,
            remote: {
              toBigInt: () => 0n,
            } as u128,
          };

          const result = await config.transform(mockData);
          expect(result).toBe(3000n);
        }
      });

      it('should handle large fee values', async () => {
        const builder = outboundQueueApi().calculateFee().agentExecute();
        const config = builder.build(protocolFeeParams);

        if (config instanceof SubstrateQueryConfig) {
          const mockData = {
            local: {
              toBigInt: () => 999_999_999_999_999n,
            } as u128,
            remote: {
              toBigInt: () => 888_888_888_888_888n,
            } as u128,
          };

          const result = await config.transform(mockData);
          expect(result).toBe(1_888_888_888_888_887n);
        }
      });
    });
  });
});
