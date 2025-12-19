import type { u128 } from '@polkadot/types';
import { describe, expect, it } from 'vitest';
import { feeBuilderParamsMock } from '../../../fixtures';
import { SubstrateQueryConfig } from '../../types';
import { outboundQueueApi } from './outboundQueueApi';

describe('outboundQueueApi', () => {
  describe('calculateFee', () => {
    it('should return a FeeConfigBuilder', () => {
      const result = outboundQueueApi().calculateFee();

      expect(result).toHaveProperty('build');
      expect(typeof result.build).toBe('function');
    });

    it('should build a SubstrateQueryConfig with correct module and function', () => {
      const builder = outboundQueueApi().calculateFee();
      const config = builder.build(feeBuilderParamsMock);

      expect(config).toBeInstanceOf(SubstrateQueryConfig);

      if (config instanceof SubstrateQueryConfig) {
        expect(config.module).toBe('outboundQueueApi');
        expect(config.func).toBe('calculateFee');
        expect(config.queryType).toBe('call');
      }
    });

    it('should generate correct args structure', () => {
      const builder = outboundQueueApi().calculateFee();
      const config = builder.build(feeBuilderParamsMock);

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

    it('should use correct tokenId from asset', () => {
      const builder = outboundQueueApi().calculateFee();
      const config = builder.build(feeBuilderParamsMock);

      if (config instanceof SubstrateQueryConfig) {
        const mintForeignToken = (config.args[0] as any).MintForeignToken;
        expect(mintForeignToken.tokenId).toBe(
          feeBuilderParamsMock.asset.getAssetId(),
        );
      }
    });

    it('should use correct recipient address', () => {
      const builder = outboundQueueApi().calculateFee();
      const config = builder.build(feeBuilderParamsMock);

      if (config instanceof SubstrateQueryConfig) {
        const mintForeignToken = (config.args[0] as any).MintForeignToken;
        expect(mintForeignToken.recipient).toBe(feeBuilderParamsMock.address);
      }
    });

    it('should use balance amount from params', () => {
      const builder = outboundQueueApi().calculateFee();
      const config = builder.build(feeBuilderParamsMock);

      if (config instanceof SubstrateQueryConfig) {
        const mintForeignToken = (config.args[0] as any).MintForeignToken;
        expect(mintForeignToken.amount).toBe(
          feeBuilderParamsMock.balance?.amount,
        );
      }
    });

    it('should match args snapshot', () => {
      const builder = outboundQueueApi().calculateFee();
      const config = builder.build(feeBuilderParamsMock);

      if (config instanceof SubstrateQueryConfig) {
        expect(config.args).toMatchSnapshot();
      }
    });

    describe('transform function', () => {
      it('should sum local and remote fees', async () => {
        const builder = outboundQueueApi().calculateFee();
        const config = builder.build(feeBuilderParamsMock);

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
        const builder = outboundQueueApi().calculateFee();
        const config = builder.build(feeBuilderParamsMock);

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
        const builder = outboundQueueApi().calculateFee();
        const config = builder.build(feeBuilderParamsMock);

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
        const builder = outboundQueueApi().calculateFee();
        const config = builder.build(feeBuilderParamsMock);

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
