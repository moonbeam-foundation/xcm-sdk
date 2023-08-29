import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { Asset, Ecosystem, Parachain } from '@moonbeam-network/xcm-types';
import { dev, glmr } from '../assets';
import { acala, hydraDX, moonbeam } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { MutableConfigService } from './MutableConfigService';

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

describe('mutable config service', () => {
  const configService = new MutableConfigService();

  describe('updateAssets', () => {
    it('should register new asset', () => {
      const asset = new Asset({
        key: 'test',
        originSymbol: 'TEST',
      });
      configService.updateAssets(asset);
      const registeredAsset = configService.getAsset(asset.key);
      expect(asset).toStrictEqual(registeredAsset);
    });
  });

  describe('updateChains', () => {
    it('should register new chain', () => {
      configService.updateChains(TEST_CHAIN);
      const registeredChain = configService.getChain(TEST_CHAIN.key);
      expect(TEST_CHAIN).toStrictEqual(registeredChain);
    });
  });

  describe('updateChain', () => {
    it('should update existing chain ws', () => {
      const chainDelta = { ws: 'wss://wss.api.whatever' } as Partial<Parachain>;
      configService.updateChain(hydraDX, chainDelta);
      const { ws } = configService.getChain(hydraDX);
      expect(chainDelta.ws).toStrictEqual(ws);
    });

    it('should update existing chain with new asset', () => {
      const asset = {
        asset: dev,
        id: 9999,
      };
      const data = hydraDX.assetsData.set(asset.asset.key, asset);
      const chainDelta = { assetsData: data } as Partial<Parachain>;
      configService.updateChain(hydraDX, chainDelta);

      const { assetsData } = configService.getChain(hydraDX);
      expect(asset).toStrictEqual(assetsData.get(dev.key));
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
      configService.updateChains(TEST_CHAIN);

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

  describe('updateAssetConfig', () => {
    it('should update existing asset config', () => {
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

      configService.updateAssetConfig(hydraDX, assetConfig);
      const updated = configService.getAssetDestinationConfig(
        assetConfig.asset,
        hydraDX,
        assetConfig.destination,
      );

      expect(updated).toStrictEqual(assetConfig);
    });

    it('should create new asset config', () => {
      const assetConfig = new AssetConfig({
        asset: glmr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destination: acala,
        destinationFee: {
          amount: 0.02,
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      });

      const chainConfig = configService.getChainConfig(hydraDX);
      configService.updateAssetConfig(hydraDX, assetConfig);
      const updatedChainConfig = configService.getChainConfig(hydraDX);

      const updated = configService.getAssetDestinationConfig(
        assetConfig.asset,
        hydraDX,
        assetConfig.destination,
      );

      expect(updated).toStrictEqual(assetConfig);
      expect(updatedChainConfig.getAssetsConfigs()).toHaveLength(
        chainConfig.getAssetsConfigs().length + 1,
      );
    });
  });
});
