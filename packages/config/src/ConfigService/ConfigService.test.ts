import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import {
  Asset,
  ChainAsset,
  Ecosystem,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import { describe, expect, it } from 'vitest';
import { alan, assetsList, dev, dot, glmr, hdx, tt1, unit } from '../assets';
import {
  alphanetRelay,
  hydration,
  moonbaseAlpha,
  moonbaseBeta,
  moonbeam,
  moonriver,
  shiden,
} from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';
import { xcmRoutesMap } from '../xcm-configs';
import { ConfigService } from './ConfigService';

const TEST_CHAIN = new Parachain({
  assets: [ChainAsset.fromAsset(dot, { decimals: 10 })],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: '',
  isTestChain: true,
  key: 'test',
  name: 'test',
  nativeAsset: dot,
  parachainId: 9999,
  ss58Format: 1999,
  ws: [''],
});

describe('config service', () => {
  const configService = new ConfigService({ routes: xcmRoutesMap });

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
            assets: [],
            ecosystem: Ecosystem.AlphanetRelay,
            genesisHash: '',
            id: 1287,
            isTestChain: true,
            key: 'test',
            name: 'test',
            nativeAsset: unit,
            parachainId: 1000,
            rpc: '',
            ss58Format: 1287,
            ws: [''],
          }),
        ),
      ).toThrow(new Error('Chain test not found'));
    });
  });

  describe('getSourceChains', () => {
    it('should get source chains', () => {
      const chains = configService.getSourceChains({
        ecosystem: Ecosystem.AlphanetRelay,
      });

      expect(chains).toStrictEqual(expect.arrayContaining([moonbaseAlpha]));
    });

    it('should get source chains for asset', () => {
      const chains = configService.getSourceChains({
        asset: dev,
        ecosystem: Ecosystem.AlphanetRelay,
      });

      expect(chains).toStrictEqual(expect.arrayContaining([moonbaseAlpha]));
    });
  });

  describe('getDestinationChains', () => {
    it('should get destination chains', () => {
      const chains = configService.getDestinationChains({
        source: shiden,
      });

      expect(chains).toStrictEqual(expect.arrayContaining([moonriver]));
    });

    it('should get destination chains for asset', () => {
      const chains = configService.getDestinationChains({
        asset: unit,
        source: moonbaseAlpha,
      });

      expect(chains).toStrictEqual(expect.arrayContaining([alphanetRelay]));
    });
  });

  describe('getRouteAssets', () => {
    it('should get route assets', () => {
      const assets = configService.getRouteAssets({
        source: moonbaseAlpha,
        destination: moonbaseBeta,
      });

      expect(assets).toStrictEqual(expect.arrayContaining([dev, alan]));
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

  describe('updateChainRoute', () => {
    it('should update existing chain config', () => {
      const routes = new ChainRoutes({
        chain: hydration,
        routes: [
          {
            source: {
              asset: glmr,
              balance: BalanceBuilder().substrate().tokens().accounts(),
              fee: {
                asset: hdx,
                balance: BalanceBuilder().substrate().system().account(),
              },
            },
            destination: {
              asset: glmr,
              chain: moonbeam,
              balance: BalanceBuilder().substrate().tokens().accounts(),
              fee: {
                amount: 0.02,
                asset: glmr,
                balance: BalanceBuilder().substrate().tokens().accounts(),
              },
            },
            extrinsic: ExtrinsicBuilder().xTokens().transfer(),
          },
        ],
      });

      configService.updateChainRoute(routes);

      expect(configService.getChainRoutes(hydration).getRoutes()).toStrictEqual(
        routes.getRoutes(),
      );
    });
  });

  describe('updateEndpoints', () => {
    it('should update both RPC and WS endpoints for EVM chains', () => {
      const configService = new ConfigService({ routes: xcmRoutesMap });
      const newEndpoints = {
        [moonbaseAlpha.key]: {
          rpc: 'https://new-rpc.test',
          ws: ['wss://new-ws.test'],
        },
      };

      configService.updateEndpoints(newEndpoints);
      const chain = configService.getChain(moonbaseAlpha.key) as EvmParachain;

      expect(chain.ws).toStrictEqual(['wss://new-ws.test']);
      expect(chain.rpc).toBe('https://new-rpc.test');
      expect(chain).toBeInstanceOf(EvmParachain);
    });

    it('should update only WS endpoints for non-EVM chains', () => {
      const configService = new ConfigService({ routes: xcmRoutesMap });
      const newEndpoints = {
        [alphanetRelay.key]: {
          rpc: 'https://new-rpc.test',
          ws: ['wss://new-ws.test'],
        },
      };

      configService.updateEndpoints(newEndpoints);
      const chain = configService.getChain(alphanetRelay.key) as Parachain;

      expect(chain.ws).toStrictEqual(['wss://new-ws.test']);
    });

    it('should handle non-existent chains gracefully', () => {
      const configService = new ConfigService({ routes: xcmRoutesMap });
      const newEndpoints = {
        nonExistentChain: {
          rpc: 'https://new-rpc.test',
          ws: ['wss://new-ws.test'],
        },
      };

      // Should not throw an error
      expect(() => configService.updateEndpoints(newEndpoints)).not.toThrow();
    });

    it('should handle empty endpoint values', () => {
      const configService = new ConfigService({ routes: xcmRoutesMap });
      const originalChain = configService.getChain(
        moonbaseAlpha.key,
      ) as EvmParachain;

      const originalRpc = originalChain.rpc;
      const originalWs = originalChain.ws;

      const newEndpoints = {
        [moonbaseAlpha.key]: {
          rpc: '',
          ws: [''],
        },
      };

      configService.updateEndpoints(newEndpoints);
      const chain = configService.getChain(moonbaseAlpha.key) as EvmParachain;

      expect(chain.rpc).toBe(originalRpc);
      expect(chain.ws).toStrictEqual(originalWs);
    });
  });
});
