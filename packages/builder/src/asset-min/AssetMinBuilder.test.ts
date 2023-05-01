import { TypeRegistry, U128 } from '@polkadot/types';
import { AssetMinBuilder } from './AssetMinBuilder';

function balanceOf(number: number | string): U128 {
  return new U128(new TypeRegistry(), number);
}

describe('assetMinBuilder', () => {
  const asset = '<ASSET>';

  describe('assetRegistry', () => {
    describe('assetMetadatas', () => {
      const config = AssetMinBuilder()
        .assetRegistry()
        .assetMetadatas()
        .build({ asset });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', () => {
        expect(config.transform({ minimalBalance: balanceOf(999) })).toBe(999n);
      });
    });

    describe('currencyMetadatas', () => {
      const config = AssetMinBuilder()
        .assetRegistry()
        .currencyMetadatas()
        .build({ asset });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', () => {
        expect(config.transform({ minimalBalance: balanceOf(999) })).toBe(999n);
      });
    });
  });

  describe('assets', () => {
    describe('asset', () => {
      const config = AssetMinBuilder().assets().asset().build({ asset });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', () => {
        expect(config.transform({ minBalance: balanceOf(999) })).toBe(999n);
      });
    });
  });
});
