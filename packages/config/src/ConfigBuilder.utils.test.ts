import { Asset, Ecosystem, EthereumChain } from '@moonbeam-network/xcm-types';
import {
  getAsset,
  getChain,
  getEcosystemAssets,
  getSourceChains,
} from './ConfigBuilder.utils';
import { assetsList, dev, tt1, unit } from './assets';
import { equilibriumAlphanet, moonbaseAlpha } from './chains';

describe('config utils', () => {
  describe('getEcosystemAssets', () => {
    it('should return all assets', () => {
      const assets = getEcosystemAssets();

      expect(assets).toStrictEqual(assetsList);
    });

    it('should return assets for a given ecosystem', () => {
      const assets = getEcosystemAssets(Ecosystem.AlphanetRelay);

      expect(assets.length).toBeLessThan(assetsList.length);
      expect(assets).toStrictEqual(expect.arrayContaining([dev, unit, tt1]));
    });
  });

  describe('getAsset', () => {
    it('should get asset by key', () => {
      expect(getAsset(dev.key)).toStrictEqual(dev);
    });

    it('should get asset by asset', () => {
      expect(getAsset(dev)).toStrictEqual(dev);
    });

    it('should throw an error if asset not found', () => {
      expect(() => getAsset('test')).toThrow(new Error('Asset test not found'));
    });

    it('should throw an error if asset is not in the config', () => {
      expect(() =>
        getAsset(
          new Asset({
            key: 'test',
            originSymbol: 'test',
          }),
        ),
      ).toThrow(new Error('Asset test not found'));
    });
  });

  describe('getChain', () => {
    it('should get chain by key', () => {
      expect(getChain(moonbaseAlpha.key)).toStrictEqual(moonbaseAlpha);
    });

    it('should get chain by chain', () => {
      expect(getChain(moonbaseAlpha)).toStrictEqual(moonbaseAlpha);
    });

    it('should throw an error if chain not found', () => {
      expect(() => getChain('test')).toThrow(new Error('Chain test not found'));
    });

    it('should throw an error if chain is not in the config', () => {
      expect(() =>
        getChain(
          new EthereumChain({
            id: 'test',
            key: 'test',
            name: 'test',
            ws: 'test',
          }),
        ),
      ).toThrow(new Error('Chain test not found'));
    });
  });

  describe('getSourceChains', () => {
    it('should get source chains for asset', () => {
      const chains = getSourceChains(dev);

      expect(chains).toStrictEqual(
        expect.arrayContaining([moonbaseAlpha, equilibriumAlphanet]),
      );
    });
  });
});
