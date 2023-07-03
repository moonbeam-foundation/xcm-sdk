import { ChainConfig } from '../types/ChainConfig';

import { acalaConfig } from './acala';
import { alphanetRelayConfig } from './alphanetRelay';
import { astarConfig } from './astar';
import { bifrostKusamaConfig } from './bifrostKusama';
import { bifrostPolkadotConfig } from './bifrostPolkadot';
import { calamariConfig } from './calamari';
import { centrifugeConfig } from './centrifuge';
import { crustShadowConfig } from './crustShadow';
import { darwiniaConfig } from './darwinia';
import { darwiniaCrabConfig } from './darwiniaCrab';
import { darwiniaPangoroConfig } from './darwiniaPangoro';
import { equilibriumConfig } from './equilibrium';
import { equilibriumAlphanetConfig } from './equilibriumAlphanet';
import { hydraDxConfig } from './hydraDX';
import { integriteeConfig } from './integritee';
import { interlayConfig } from './interlay';
import { karuraConfig } from './karura';
import { khalaConfig } from './khala';
import { kintsugiConfig } from './kintsugi';
import { kusamaConfig } from './kusama';
import { litentryAlphanetConfig } from './litentryAlphanet';
import { litmusConfig } from './litmus';
import { mangataKusamaConfig } from './mangataKusama';
import { moonbaseAlphaConfig } from './moonbaseAlpha';
import { moonbeamConfig } from './moonbeam';
import { moonriverConfig } from './moonriver';
import { nodleEdenConfig } from './nodleEden';
import { parallelConfig } from './parallel';
import { parallelHeikoConfig } from './parallelHeiko';
import { phalaConfig } from './phala';
import { polkadotConfig } from './polkadot';
import { polkadotAssetHubConfig } from './polkadotAssetHub';
import { robonomicsConfig } from './robonomics';
import { shidenConfig } from './shiden';
import { statemineConfig } from './statemine';
import { statemineAlphanetConfig } from './statemineAlphanet';
import { subsocialAlphanetConfig } from './subsocialAlphanet';
import { turingAlphanetConfig } from './turingAlphanet';
import { uniqueAlphaConfig } from './uniqueAlpha';

export const chainsConfigList: ChainConfig[] = [
  acalaConfig,
  alphanetRelayConfig,
  astarConfig,
  bifrostKusamaConfig,
  bifrostPolkadotConfig,
  calamariConfig,
  centrifugeConfig,
  crustShadowConfig,
  darwiniaConfig,
  darwiniaCrabConfig,
  darwiniaPangoroConfig,
  equilibriumAlphanetConfig,
  equilibriumConfig,
  hydraDxConfig,
  integriteeConfig,
  interlayConfig,
  karuraConfig,
  khalaConfig,
  kintsugiConfig,
  kusamaConfig,
  litentryAlphanetConfig,
  litmusConfig,
  mangataKusamaConfig,
  moonbaseAlphaConfig,
  moonbeamConfig,
  moonriverConfig,
  nodleEdenConfig,
  parallelConfig,
  parallelHeikoConfig,
  phalaConfig,
  polkadotConfig,
  robonomicsConfig,
  shidenConfig,
  statemineAlphanetConfig,
  statemineConfig,
  polkadotAssetHubConfig,
  subsocialAlphanetConfig,
  turingAlphanetConfig,
  uniqueAlphaConfig,
];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfigList.map((config) => [config.chain.key, config]),
);
