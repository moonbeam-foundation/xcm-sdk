/* eslint-disable sort-keys */
import { Ecosystem } from '@moonbeam-network/xcm-types';
import { ConfigService } from '../ConfigService';
import { dev } from '../assets';
import { equilibriumAlphanet, moonbaseAlpha } from '../chains';
import { equilibriumAlphanetConfig } from '../configs/equilibriumAlphanet';
import { moonbaseAlphaConfig } from '../configs/moonbaseAlpha';
import { ConfigBuilder } from './ConfigBuilder';

describe('configBuilder', () => {
  it('should return correct dev config', () => {
    const config = ConfigBuilder()
      .assets(Ecosystem.AlphanetRelay)
      .asset(dev)
      .source(moonbaseAlpha)
      .destination(equilibriumAlphanet)
      .build();

    expect(config).toStrictEqual({
      asset: dev,
      source: {
        chain: moonbaseAlpha,
        config: moonbaseAlphaConfig.getAssetDestinationConfig(
          dev,
          equilibriumAlphanet,
        ),
      },
      destination: {
        chain: equilibriumAlphanet,
        config: equilibriumAlphanetConfig.getAssetDestinationConfig(
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
      .destination(equilibriumAlphanet)
      .build();

    expect(config).toStrictEqual({
      asset: dev,
      source: {
        chain: moonbaseAlpha,
        config: moonbaseAlphaConfig.getAssetDestinationConfig(
          dev,
          equilibriumAlphanet,
        ),
      },
      destination: {
        chain: equilibriumAlphanet,
        config: equilibriumAlphanetConfig.getAssetDestinationConfig(
          dev,
          moonbaseAlpha,
        ),
      },
    });
  });
});
