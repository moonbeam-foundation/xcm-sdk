import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import {
  Asset,
  Ecosystem,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import { assetsList, dev, glmr, tt1, unit } from '../assets';
import { hydraDX, moonbaseAlpha, moonbeam, pendulumAlphanet } from '../chains';
import { ConfigService } from './ConfigService';

import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

const TEST_CHAIN = new Parachain({
  ecosystem: Ecosystem.Polkadot,
  genesisHash: '',
  isTestChain: true,
  key: 'test',
  name: 'test',
  parachainId: 9999,
  ss58Format: 1999,
  ws: '',
});

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
        expect.arrayContaining([moonbaseAlpha, pendulumAlphanet]),
      );
    });
  });

  describe('updateAssets', () => {
    it('should register new asset', () => {
      const asset = new Asset({
        key: 'test',
        originSymbol: 'TEST',
      });
      configService.updateAsset(asset);
      const registeredAsset = configService.getAsset(asset.key);
      expect(asset).toStrictEqual(registeredAsset);
    });
  });

  describe('updateChains', () => {
    it('should register new chain', () => {
      configService.updateChain(TEST_CHAIN);
      const registeredChain = configService.getChain(TEST_CHAIN.key);
      expect(TEST_CHAIN).toStrictEqual(registeredChain);
    });
  });

  describe('updateChainConfig', () => {
    it('should update existing chain config', () => {
      const assetConfig = new AssetConfig({
        asset: glmr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destination: moonbeam,
        destinationFee: {
          amount: 0.02,
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      });

      const chainConfig = new ChainConfig({
        assets: [assetConfig],
        chain: hydraDX,
      });

      configService.updateChainConfig(chainConfig);
      const updated = configService.getChainConfig(hydraDX);
      expect(updated.getAssetsConfigs()).toStrictEqual(
        chainConfig.getAssetsConfigs(),
      );
    });

    it('should create new chain config', () => {
      configService.updateChain(TEST_CHAIN);

      const assetConfig = new AssetConfig({
        asset: glmr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destination: moonbeam,
        destinationFee: {
          amount: 0.02,
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      });

      const chainConfig = new ChainConfig({
        assets: [assetConfig],
        chain: TEST_CHAIN,
      });

      configService.updateChainConfig(chainConfig);
      const updated = configService.getChainConfig('test');
      expect(updated.getAssetsConfigs()).toStrictEqual(
        chainConfig.getAssetsConfigs(),
      );
    });
  });
});
