/* eslint-disable sort-keys */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { Ecosystem } from '@moonbeam-network/xcm-types';
import { ConfigService } from '../ConfigService';
import { dev } from '../assets';
import { moonbaseAlpha, pendulumAlphanet } from '../chains';
import { moonbaseAlphaRoutes } from '../xcm-configs/moonbaseAlpha';
import { pendulumAlphanetRoutes } from '../xcm-configs/pendulumAlphanet';
import { ConfigBuilder } from './ConfigBuilder';
import { routesMap } from '../xcm-configs';

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
        config: moonbaseAlphaRoutes.getAssetRoute(dev, pendulumAlphanet),
      },
      destination: {
        chain: pendulumAlphanet,
        config: pendulumAlphanetRoutes.getAssetRoute(dev, moonbaseAlpha),
      },
    });
  });

  it('should return correct dev config using mutable service', () => {
    const configService = new ConfigService({ routes: routesMap });
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
        config: moonbaseAlphaRoutes.getAssetRoute(dev, pendulumAlphanet),
      },
      destination: {
        chain: pendulumAlphanet,
        config: pendulumAlphanetRoutes.getAssetRoute(dev, moonbaseAlpha),
      },
    });
  });
});
