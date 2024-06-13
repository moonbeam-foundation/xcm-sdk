/* eslint-disable sort-keys */
import { describe, expect, it } from '@jest/globals';
import { Ecosystem } from '@moonbeam-network/xcm-types';
import { ConfigService } from '../ConfigService';
import { dev } from '../assets';
import { moonbaseAlphaConfig } from '../configs/moonbaseAlpha';
import { pendulumAlphanetConfig } from '../configs/pendulumAlphanet';
import { moonbaseAlpha, pendulumAlphanet } from '../xcmChains';
import { ConfigBuilder } from './ConfigBuilder';

describe('configBuilder', () => {
  it('should return correct dev config', () => {
    const config = ConfigBuilder()
      .assets(Ecosystem.AlphanetRelay)
      .asset(dev)
      .source(moonbaseAlpha)
      .destination(pendulumAlphanet)
      .build();

    expect(config).toStrictEqual({
      asset: dev,
      source: {
        chain: moonbaseAlpha,
        config: moonbaseAlphaConfig.getAssetDestinationConfig(
          dev,
          pendulumAlphanet,
        ),
      },
      destination: {
        chain: pendulumAlphanet,
        config: pendulumAlphanetConfig.getAssetDestinationConfig(
          dev,
          moonbaseAlpha,
        ),
      },
    });
  });

  it('should return correct dev config using mutable service', () => {
    const configService = new ConfigService();
    const config = ConfigBuilder(configService)
      .assets(Ecosystem.AlphanetRelay)
      .asset(dev)
      .source(moonbaseAlpha)
      .destination(pendulumAlphanet)
      .build();

    expect(config).toStrictEqual({
      asset: dev,
      source: {
        chain: moonbaseAlpha,
        config: moonbaseAlphaConfig.getAssetDestinationConfig(
          dev,
          pendulumAlphanet,
        ),
      },
      destination: {
        chain: pendulumAlphanet,
        config: pendulumAlphanetConfig.getAssetDestinationConfig(
          dev,
          moonbaseAlpha,
        ),
      },
    });
  });
});
