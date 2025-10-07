import {
  AssetAmount,
  ChainAsset,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import { describe, expect, it, vi } from 'vitest';
import {
  alphanetAssetHubMock,
  alphanetRelayMock,
  buildParamsMock,
  interlayTestnetMock,
  moonbaseAlphaMock,
  test,
  testAssetAmount,
  testAssetAmount2,
  testChainAsset,
} from '../../fixtures';
import {
  encodeXcmMessageToBytes,
  getAddressGlobalConsensusAssetMultilocation,
  getAssetAddressMultilocation,
  getBeneficiaryMultilocation,
  getDestinationMultilocation,
  getDestinationParachainMultilocation,
  getGlobalConsensusAssetMultilocation,
  getGlobalConsensusDestination,
  getPalletInstanceMultilocation,
  getPrecompileDestinationInterior,
} from './ContractBuilder.utils';

// Create a more complete API mock for encoding functions
const mockApiWithEncoding = {
  ...buildParamsMock.sourceApi,
  createType: vi.fn((type: string, value: unknown) => ({
    toHex: () => {
      // Return deterministic hex values for testing
      const serialized = JSON.stringify(value);
      if (type === 'XcmVersionedXcm') {
        return '0x03140004000100a10f043205011f000210020400010100a10f020c';
      }
      if (type === 'XcmV3Junction') {
        if (serialized.includes('GlobalConsensus')) {
          return '0x02000000';
        }
        if (serialized.includes('PalletInstance')) {
          return `0x04${JSON.stringify(value).match(/\d+/)?.[0].padStart(2, '0') || '00'}`;
        }
      }
      return '0x00';
    },
  })),
} as unknown as ApiPromise;

describe('ContractBuilder.utils', () => {
  describe('getPrecompileDestinationInterior', () => {
    it('should return only parachain encoding when no address provided', () => {
      const result = getPrecompileDestinationInterior(moonbaseAlphaMock);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('0x00000003e8');
      expect(result).toMatchSnapshot();
    });

    it('should return parachain and address encoding when address provided', () => {
      const address = '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E';
      const result = getPrecompileDestinationInterior(
        moonbaseAlphaMock,
        address,
      );

      expect(result).toHaveLength(2);
      expect(result[0]).toBe('0x00000003e8');
      expect(result[1]).toContain('0x03'); // EVM account type
      expect(result).toMatchSnapshot();
    });

    it('should encode EVM address with type 03 for EvmParachain', () => {
      const address = '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E';
      const result = getPrecompileDestinationInterior(
        moonbaseAlphaMock,
        address,
      );

      expect(result[1]).toMatch(/^0x03/);
      expect(result).toMatchSnapshot();
    });

    it('should encode Substrate address with type 01 for regular Parachain', () => {
      const address = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
      const result = getPrecompileDestinationInterior(
        alphanetAssetHubMock,
        address,
      );

      expect(result[1]).toMatch(/^0x01/);
      expect(result).toMatchSnapshot();
    });

    it('should return only address for relay chain (parachainId = 0)', () => {
      const address = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
      const result = getPrecompileDestinationInterior(
        alphanetRelayMock,
        address,
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toMatch(/^0x01/);
      expect(result).toMatchSnapshot();
    });
  });

  describe('getBeneficiaryMultilocation', () => {
    it('should return correct multilocation for EVM address', () => {
      const address = '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E';
      const result = getBeneficiaryMultilocation(address, moonbaseAlphaMock);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe(0);
      expect(result[1]).toHaveLength(1);
      expect(result[1][0]).toMatch(/^0x03/);
      expect(result).toMatchSnapshot();
    });

    it('should return correct multilocation for Substrate address', () => {
      const address = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
      const result = getBeneficiaryMultilocation(address, alphanetAssetHubMock);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe(0);
      expect(result[1]).toHaveLength(1);
      expect(result[1][0]).toMatch(/^0x01/);
      expect(result).toMatchSnapshot();
    });
  });

  describe('getDestinationMultilocation', () => {
    it('should return correct multilocation with parents=1', () => {
      const address = '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E';
      const result = getDestinationMultilocation(address, moonbaseAlphaMock);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe(1);
      expect(result[1]).toHaveLength(2); // parachain + address
      expect(result).toMatchSnapshot();
    });

    it('should include parachain encoding in interior', () => {
      const address = '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E';
      const result = getDestinationMultilocation(address, moonbaseAlphaMock);

      expect(result[1][0]).toBe('0x00000003e8'); // Moonbase parachain ID 1000
      expect(result).toMatchSnapshot();
    });
  });

  describe('getDestinationParachainMultilocation', () => {
    it('should return [1, [parachain]] for regular parachain', () => {
      const result = getDestinationParachainMultilocation(moonbaseAlphaMock);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe(1);
      expect(result[1]).toHaveLength(1);
      expect(result[1][0]).toBe('0x00000003e8');
      expect(result).toMatchSnapshot();
    });

    it('should return [1, []] for relay chain', () => {
      const result = getDestinationParachainMultilocation(alphanetRelayMock);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe(1);
      expect(result[1]).toHaveLength(0);
      expect(result).toMatchSnapshot();
    });
  });

  describe('getGlobalConsensusDestination', () => {
    it('should return [2, [globalConsensus, parachain]]', () => {
      const result = getGlobalConsensusDestination(
        mockApiWithEncoding,
        moonbaseAlphaMock,
      );

      expect(result).toHaveLength(2);
      expect(result[0] as number).toBe(2);
      expect((result[1] as unknown[]).length).toBe(2);
      expect(result).toMatchSnapshot();
    });

    it('should include encoded global consensus', () => {
      const result = getGlobalConsensusDestination(
        mockApiWithEncoding,
        moonbaseAlphaMock,
      );

      expect((result[1] as string[])[0]).toBe('0x02000000');
      expect(result).toMatchSnapshot();
    });

    it('should include parachain encoding', () => {
      const result = getGlobalConsensusDestination(
        mockApiWithEncoding,
        moonbaseAlphaMock,
      );

      expect((result[1] as string[])[1]).toBe('0x00000003e8');
      expect(result).toMatchSnapshot();
    });
  });

  describe('getPalletInstanceMultilocation', () => {
    it('should return correct multilocation with pallet instance', () => {
      const result = getPalletInstanceMultilocation(
        mockApiWithEncoding,
        testAssetAmount,
      );

      expect(result).toHaveLength(2);
      expect((result[0] as unknown[]).length).toBe(2); // [parents, interior]
      expect((result[0] as number[])[0]).toBe(0);
      expect(((result[0] as unknown[])[1] as unknown[]).length).toBe(1);
      expect(result[1]).toBe(testAssetAmount.amount);
      expect(result).toMatchSnapshot();
    });

    it('should encode pallet instance correctly', () => {
      const result = getPalletInstanceMultilocation(
        mockApiWithEncoding,
        testAssetAmount,
      );

      expect(((result[0] as unknown[])[1] as string[])[0]).toContain('0x04'); // PalletInstance prefix
      expect(result).toMatchSnapshot();
    });

    it('should include correct asset amount', () => {
      const result = getPalletInstanceMultilocation(
        mockApiWithEncoding,
        testAssetAmount2,
      );

      expect(result[1] as bigint).toBe(testAssetAmount2.amount);
      expect(result).toMatchSnapshot();
    });
  });

  describe('getAssetAddressMultilocation', () => {
    it('should return correct multilocation with address', () => {
      const result = getAssetAddressMultilocation(
        mockApiWithEncoding,
        testAssetAmount,
        moonbaseAlphaMock,
      );

      expect(result).toHaveLength(2);
      expect((result[0] as unknown[]).length).toBe(2);
      expect(((result[0] as unknown[])[1] as unknown[]).length).toBe(2); // pallet instance + address
      expect(result[1]).toBe(testAssetAmount.amount);
      expect(result).toMatchSnapshot();
    });

    it('should throw error when asset address is missing', () => {
      const assetWithoutAddress = testChainAsset.copyWith({
        address: undefined,
      });
      const assetAmountWithoutAddress = AssetAmount.fromChainAsset(
        assetWithoutAddress,
        { amount: 99_000_000_000n },
      );

      expect(() =>
        getAssetAddressMultilocation(
          mockApiWithEncoding,
          assetAmountWithoutAddress,
          moonbaseAlphaMock,
        ),
      ).toThrow('Asset address is required');
    });

    it('should include both pallet instance and address in interior', () => {
      const result = getAssetAddressMultilocation(
        mockApiWithEncoding,
        testAssetAmount,
        moonbaseAlphaMock,
      );

      expect(((result[0] as unknown[])[1] as string[])[0]).toContain('0x04'); // PalletInstance
      expect(((result[0] as unknown[])[1] as string[])[1]).toMatch(/^0x03/); // EVM address type
      expect(result).toMatchSnapshot();
    });
  });

  describe('getGlobalConsensusAssetMultilocation', () => {
    it('should return correct multilocation with global consensus', () => {
      const result = getGlobalConsensusAssetMultilocation(
        mockApiWithEncoding,
        testAssetAmount,
        interlayTestnetMock,
      );

      expect(result).toHaveLength(2);
      expect((result[0] as unknown[]).length).toBe(2);
      expect((result[0] as number[])[0]).toBe(2); // parents
      expect(((result[0] as unknown[])[1] as unknown[]).length).toBe(3); // globalConsensus + parachain + palletInstance
      expect(result[1]).toBe(testAssetAmount.amount);
      expect(result).toMatchSnapshot();
    });

    it('should include global consensus, parachain, and pallet instance', () => {
      const result = getGlobalConsensusAssetMultilocation(
        mockApiWithEncoding,
        testAssetAmount,
        interlayTestnetMock,
      );

      expect(((result[0] as unknown[])[1] as string[])[0]).toBe('0x02000000'); // GlobalConsensus
      expect(((result[0] as unknown[])[1] as string[])[1]).toBe('0x00000007f0'); // Parachain 2032
      expect(((result[0] as unknown[])[1] as string[])[2]).toContain('0x04'); // PalletInstance
      expect(result).toMatchSnapshot();
    });
  });

  describe('getAddressGlobalConsensusAssetMultilocation', () => {
    it('should return correct multilocation with address', () => {
      const result = getAddressGlobalConsensusAssetMultilocation(
        mockApiWithEncoding,
        testAssetAmount,
        moonbaseAlphaMock,
      );

      expect(result).toHaveLength(2);
      expect((result[0] as unknown[]).length).toBe(2);
      expect((result[0] as number[])[0]).toBe(2);
      expect(((result[0] as unknown[])[1] as unknown[]).length).toBe(4); // globalConsensus + parachain + palletInstance + address
      expect(result[1]).toBe(testAssetAmount.amount);
      expect(result).toMatchSnapshot();
    });

    it('should throw error when asset address is missing in destination', () => {
      const assetWithoutAddress = ChainAsset.fromAsset(test, {
        address: undefined,
        decimals: 18,
        ids: { palletInstance: 10 },
      });

      const destinationChain = new EvmParachain({
        ...moonbaseAlphaMock,
        assets: [assetWithoutAddress],
        nativeAsset: test,
      });

      expect(() =>
        getAddressGlobalConsensusAssetMultilocation(
          mockApiWithEncoding,
          testAssetAmount,
          destinationChain,
        ),
      ).toThrow('Asset address is required');
    });

    it('should include all components in correct order', () => {
      const result = getAddressGlobalConsensusAssetMultilocation(
        mockApiWithEncoding,
        testAssetAmount,
        moonbaseAlphaMock,
      );

      const interior = (result[0] as unknown[])[1] as string[];
      expect(interior[0]).toBe('0x02000000'); // GlobalConsensus
      expect(interior[1]).toBe('0x00000003e8'); // Parachain
      expect(interior[2]).toContain('0x04'); // PalletInstance
      expect(interior[3]).toMatch(/^0x03/); // EVM address
      expect(result).toMatchSnapshot();
    });
  });

  describe('encodeXcmMessageToBytes', () => {
    it('should encode XCM message correctly', () => {
      const xcmMessage = {
        V3: [
          {
            WithdrawAsset: [
              {
                id: { Concrete: { parents: 0, interior: 'Here' } },
                fun: { Fungible: '1000000000000' },
              },
            ],
          },
        ],
      };

      const result = encodeXcmMessageToBytes(xcmMessage, mockApiWithEncoding);

      expect(result).toBe(
        '0x03140004000100a10f043205011f000210020400010100a10f020c',
      );
      expect(result).toMatch(/^0x/);
      expect(result).toMatchSnapshot();
    });

    it('should throw error when API is undefined', () => {
      const xcmMessage = { V3: [] };

      expect(() => encodeXcmMessageToBytes(xcmMessage, undefined)).toThrow(
        'API is required to encode XCM message',
      );
    });

    it('should handle encoding errors', () => {
      const failingApi = {
        createType: vi.fn(() => {
          throw new Error('Encoding failed');
        }),
      } as unknown as ApiPromise;

      const xcmMessage = { V3: [] };
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => encodeXcmMessageToBytes(xcmMessage, failingApi)).toThrow(
        'Encoding failed',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to encode XCM message:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });

    it('should pass xcmMessage to createType', () => {
      const xcmMessage = { V3: [{ ClearOrigin: null }] };
      const createTypeSpy = vi.spyOn(mockApiWithEncoding, 'createType');

      encodeXcmMessageToBytes(xcmMessage, mockApiWithEncoding);

      expect(createTypeSpy).toHaveBeenCalledWith('XcmVersionedXcm', xcmMessage);
    });
  });
});
