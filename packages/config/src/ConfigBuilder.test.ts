/* eslint-disable sort-keys */
import { Ecosystem } from '@moonbeam-network/xcm-types';
import { ConfigBuilder } from './ConfigBuilder';
import { dev } from './assets';
import { equilibriumAlphanet, moonbaseAlpha } from './chains';
import { equilibriumAlphanetConfig } from './configs/equilibriumAlphanet';
import { moonbaseAlphaConfig } from './configs/moonbaseAlpha';

describe('configBuilder', () => {
  it('should return correct dev config', () => {
    const config = ConfigBuilder()
      .assets(Ecosystem.AlphanetRelay)
      .asset(dev)
      .source(moonbaseAlpha)
      .destination(equilibriumAlphanet);

    expect(config).toStrictEqual({
      asset: dev,
      source: {
        chain: moonbaseAlpha,
        config: moonbaseAlphaConfig.assets.get(dev.key)?.at(0),
      },
      destination: {
        chain: equilibriumAlphanet,
        config: equilibriumAlphanetConfig.assets.get(dev.key)?.at(0),
      },
    });
  });
});
