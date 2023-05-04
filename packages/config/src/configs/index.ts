import { ChainConfig } from '../ChainConfig';

import { acalaConfig } from './acala';
import { alphanetRelayConfig } from './alphanetRelay';
import { astarConfig } from './astar';
import { bifrostKusamaConfig } from './bifrostKusama';
import { bifrostPolkadotConfig } from './bifrostPolkadot';
import { bitCountryPioneerConfig } from './bitCountryPioneer';
import { calamariConfig } from './calamari';
import { crustShadowConfig } from './crustShadow';
import { darwiniaConfig } from './darwinia';
import { darwiniaCrabConfig } from './darwiniaCrab';
import { darwiniaPangoroConfig } from './darwiniaPangoro';
import { equilibriumConfig } from './equilibrium';
import { equilibriumAlphanetConfig } from './equilibriumAlphanet';
import { integriteeConfig } from './integritee';
import { karuraConfig } from './karura';
import { khalaConfig } from './khala';
import { kinitsugiConfig } from './kinitsugi';
import { kusamaConfig } from './kusama';
import { litentryAlphanetConfig } from './litentryAlphanet';
import { litmusConfig } from './litmus';
import { parallelConfig } from './parallel';
import { parallelHeikoConfig } from './parallelHeiko';
import { phalaConfig } from './phala';
import { polkadotConfig } from './polkadot';
import { robonomicsConfig } from './robonomics';
import { shidenConfig } from './shiden';
import { statemineConfig } from './statemine';
import { statemineAlphanetConfig } from './statemineAlphanet';
import { statemintConfig } from './statemint';
import { uniqueAlphaConfig } from './uniqueAlpha';

export const chainsConfigList: ChainConfig[] = [
  acalaConfig,
  alphanetRelayConfig,
  astarConfig,
  bifrostKusamaConfig,
  bifrostPolkadotConfig,
  bitCountryPioneerConfig,
  calamariConfig,
  crustShadowConfig,
  darwiniaConfig,
  darwiniaCrabConfig,
  darwiniaPangoroConfig,
  equilibriumConfig,
  equilibriumAlphanetConfig,
  integriteeConfig,
  karuraConfig,
  khalaConfig,
  kinitsugiConfig,
  kusamaConfig,
  litentryAlphanetConfig,
  litmusConfig,
  parallelConfig,
  parallelHeikoConfig,
  phalaConfig,
  polkadotConfig,
  robonomicsConfig,
  shidenConfig,
  statemineConfig,
  statemineAlphanetConfig,
  statemintConfig,
  uniqueAlphaConfig,
];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfigList.map((config) => [config.chain.key, config]),
);
