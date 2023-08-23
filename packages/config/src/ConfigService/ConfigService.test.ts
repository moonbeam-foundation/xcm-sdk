import { Asset, Ecosystem, EvmParachain } from '@moonbeam-network/xcm-types';
import { assetsList, dev, tt1, unit } from '../assets';
import { equilibriumAlphanet, moonbaseAlpha } from '../chains';
import { ConfigService } from './ConfigService';

describe('config service', () => {
  const configService = new ConfigService();

  describe('getEcosystemAssets', () => {
    it('should return all assets', () => {
      const assets = configService.getEcosystemAssets();

      expect(assets).toStrictEqual(assetsList);
    });

    it('should return assets for a given ecosystem', () => {
      const assets = configService.getEcosystemAssets(Ecosystem.AlphanetRelay);

      expect(assets.length).toBeLessThan(assetsList.length);
      expect(assets).toStrictEqual(expect.arrayContaining([dev, unit, tt1]));
    });
  });

  describe('getAsset', () => {
    it('should get asset by key', () => {
      expect(configService.getAsset(dev.key)).toStrictEqual(dev);
    });

    it('should get asset by asset', () => {
      expect(configService.getAsset(dev)).toStrictEqual(dev);
    });

    it('should throw an error if asset not found', () => {
      expect(() => configService.getAsset('test')).toThrow(
        new Error('Asset test not found'),
      );
    });

    it('should throw an error if asset is not in the config', () => {
      expect(() =>
        configService.getAsset(
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
      expect(configService.getChain(moonbaseAlpha.key)).toStrictEqual(
        moonbaseAlpha,
      );
    });

    it('should get chain by chain', () => {
      expect(configService.getChain(moonbaseAlpha)).toStrictEqual(
        moonbaseAlpha,
      );
    });

    it('should throw an error if chain not found', () => {
      expect(() => configService.getChain('test')).toThrow(
        new Error('Chain test not found'),
      );
    });

    it('should throw an error if chain is not in the config', () => {
      expect(() =>
        configService.getChain(
          new EvmParachain({
            ecosystem: Ecosystem.AlphanetRelay,
            genesisHash: '',
            id: 1287,
            isTestChain: true,
            key: 'test',
            name: 'test',
            parachainId: 1000,
            rpc: '',
            ss58Format: 1287,
            ws: '',
          }),
        ),
      ).toThrow(new Error('Chain test not found'));
    });
  });

  describe('getSourceChains', () => {
    it('should get source chains for asset', () => {
      const chains = configService.getSourceChains(
        dev,
        Ecosystem.AlphanetRelay,
      );

      expect(chains).toStrictEqual(
        expect.arrayContaining([moonbaseAlpha, equilibriumAlphanet]),
      );
    });
  });
});
