import { Asset, ChainAsset, EvmChain } from '@moonbeam-network/xcm-types';
import { describe, expect, it } from 'vitest';
import { feeBuilderParamsMock, testChainAsset } from '../../../fixtures';
import { GATEWAY_ABI } from '../../mrl/providers/snowbridge/snowbridge/SnowbridgeConstants';
import { ContractConfig } from '../../types';
import { gateway } from './gateway';

describe('gateway', () => {
  describe('quoteSendTokenFee', () => {
    it('should return a BridgeFeeConfigBuilder', () => {
      const result = gateway().quoteSendTokenFee();

      expect(result).toHaveProperty('build');
      expect(typeof result.build).toBe('function');
    });

    it('should build a ContractConfig with correct properties', () => {
      const builder = gateway().quoteSendTokenFee();
      const config = builder.build(feeBuilderParamsMock);

      expect(config).toBeInstanceOf(ContractConfig);

      if (config instanceof ContractConfig) {
        expect(config.module).toBe('Gateway');
        expect(config.func).toBe('quoteSendTokenFee');
        expect(config.address).toBe(
          (feeBuilderParamsMock.source as EvmChain).contracts?.Gateway,
        );
        expect(config.abi).toBe(GATEWAY_ABI);
      }
    });

    it('should generate correct args structure', () => {
      const builder = gateway().quoteSendTokenFee();
      const config = builder.build(feeBuilderParamsMock);

      if (config instanceof ContractConfig) {
        expect(config.args).toHaveLength(3);
        expect(config.args[0]).toBe(feeBuilderParamsMock.asset.address);
        expect(config.args[1]).toBe(1000);
        expect(config.args[2]).toBe(0n);
      }
    });

    it('should use asset address in args', () => {
      const builder = gateway().quoteSendTokenFee();
      const config = builder.build(feeBuilderParamsMock);

      if (config instanceof ContractConfig) {
        expect(config.args[0]).toBe(testChainAsset.address);
      }
    });

    it('should use destination parachainId in args', () => {
      const builder = gateway().quoteSendTokenFee();
      const config = builder.build(feeBuilderParamsMock);

      if (config instanceof ContractConfig) {
        expect(config.args[1]).toBe(1000);
      }
    });

    it('should use 0n as third argument', () => {
      const builder = gateway().quoteSendTokenFee();
      const config = builder.build(feeBuilderParamsMock);

      if (config instanceof ContractConfig) {
        expect(config.args[2]).toBe(0n);
      }
    });

    it('should match args snapshot', () => {
      const builder = gateway().quoteSendTokenFee();
      const config = builder.build(feeBuilderParamsMock);

      if (config instanceof ContractConfig) {
        expect(config.args).toMatchSnapshot();
      }
    });

    describe('error cases', () => {
      it('should throw error if asset has no address', () => {
        const assetWithoutAddress = ChainAsset.fromAsset(
          new Asset({ key: 'testAsset', originSymbol: 'TEST' }),
          {
            decimals: 18,
            ids: { palletInstance: 10 },
          },
        );

        const paramsWithoutAddress = {
          ...feeBuilderParamsMock,
          asset: assetWithoutAddress,
        };

        const builder = gateway().quoteSendTokenFee();

        expect(() => builder.build(paramsWithoutAddress)).toThrow(
          'Asset testAsset has no address',
        );
      });

      it('should throw error if destination is not an EvmParachain or Parachain', () => {
        const evmChain = new EvmChain({
          assets: [testChainAsset],
          ecosystem: feeBuilderParamsMock.destination.ecosystem,
          id: 1,
          isTestChain: true,
          key: 'test-evm-chain',
          name: 'Test EVM Chain',
          nativeAsset: testChainAsset,
          rpc: 'https://test.rpc',
        });

        const paramsWithEvmChain = {
          ...feeBuilderParamsMock,
          destination: evmChain,
        };

        const builder = gateway().quoteSendTokenFee();

        expect(() => builder.build(paramsWithEvmChain)).toThrow(
          'Destination must be a Parachain or EvmParachain for getting the quote send token fee for Gateway module',
        );
      });

      it('should throw error if source is not an EvmChain with Gateway contract', () => {
        const paramsWithParachainSource = {
          ...feeBuilderParamsMock,
          source: feeBuilderParamsMock.destination, // Use a parachain as source
        };

        const builder = gateway().quoteSendTokenFee();

        expect(() => builder.build(paramsWithParachainSource)).toThrow(
          'Source must be an EVMChain with the Gateway contract address configured for getting the quote send token fee for Gateway module',
        );
      });

      it('should not throw error for valid EvmParachain destination', () => {
        const builder = gateway().quoteSendTokenFee();

        expect(() => builder.build(feeBuilderParamsMock)).not.toThrow();
      });

      it('should match error snapshot for missing address', () => {
        const assetWithoutAddress = ChainAsset.fromAsset(
          new Asset({ key: 'mockAsset', originSymbol: 'MOCK' }),
          {
            decimals: 18,
            ids: { palletInstance: 10 },
          },
        );

        const paramsWithoutAddress = {
          ...feeBuilderParamsMock,
          asset: assetWithoutAddress,
        };

        const builder = gateway().quoteSendTokenFee();

        expect(() =>
          builder.build(paramsWithoutAddress),
        ).toThrowErrorMatchingSnapshot();
      });

      it('should match error snapshot for invalid destination', () => {
        const evmChain = new EvmChain({
          assets: [testChainAsset],
          ecosystem: feeBuilderParamsMock.destination.ecosystem,
          id: 1,
          isTestChain: true,
          key: 'test-evm-chain',
          name: 'Test EVM Chain',
          nativeAsset: testChainAsset,
          rpc: 'https://test.rpc',
        });

        const paramsWithEvmChain = {
          ...feeBuilderParamsMock,
          destination: evmChain,
        };

        const builder = gateway().quoteSendTokenFee();

        expect(() =>
          builder.build(paramsWithEvmChain),
        ).toThrowErrorMatchingSnapshot();
      });

      it('should match error snapshot for invalid source', () => {
        const paramsWithParachainSource = {
          ...feeBuilderParamsMock,
          source: feeBuilderParamsMock.destination, // Use a parachain as source
        };

        const builder = gateway().quoteSendTokenFee();

        expect(() =>
          builder.build(paramsWithParachainSource),
        ).toThrowErrorMatchingSnapshot();
      });
    });

    describe('ContractConfig methods', () => {
      it('should have encodeFunctionData method', () => {
        const builder = gateway().quoteSendTokenFee();
        const config = builder.build(feeBuilderParamsMock);

        if (config instanceof ContractConfig) {
          expect(config.encodeFunctionData).toBeDefined();
          expect(typeof config.encodeFunctionData).toBe('function');
        }
      });

      it('should encode function data correctly', () => {
        const builder = gateway().quoteSendTokenFee();
        const config = builder.build(feeBuilderParamsMock);

        if (config instanceof ContractConfig) {
          const encoded = config.encodeFunctionData();
          expect(encoded).toBeDefined();
          expect(typeof encoded).toBe('string');
          expect(encoded.startsWith('0x')).toBe(true);
        }
      });
    });
  });
});
