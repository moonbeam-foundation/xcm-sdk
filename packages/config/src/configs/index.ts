import { ChainConfig } from '../types/ChainConfig';

import { acalaConfig } from './acala';
import { alphanetAssetHubConfig } from './alphanetAssetHub';
import { alphanetRelayConfig } from './alphanetRelay';
import { astarConfig } from './astar';
import { bifrostKusamaConfig } from './bifrostKusama';
import { bifrostPolkadotConfig } from './bifrostPolkadot';
import { calamariConfig } from './calamari';
import { centrifugeConfig } from './centrifuge';
import { crustShadowConfig } from './crustShadow';
import { darwiniaConfig } from './darwinia';
import { darwiniaCrabConfig } from './darwiniaCrab';
import { equilibriumConfig } from './equilibrium';
import { hydraDxConfig } from './hydraDX';
import { hydraDxAlphanetConfig } from './hydraDXAlphanet';
import { integriteeConfig } from './integritee';
import { interlayConfig } from './interlay';
import { karuraConfig } from './karura';
import { khalaConfig } from './khala';
import { kintsugiConfig } from './kintsugi';
import { kusamaConfig } from './kusama';
import { kusamaAssetHubConfig } from './kusamaAssetHub';
import { litmusConfig } from './litmus';
import { mangataKusamaConfig } from './mangataKusama';
import { mantaParachainConfig } from './mantaParachain';
import { moonbaseAlphaConfig } from './moonbaseAlpha';
import { moonbaseBetaConfig } from './moonbaseBeta';
import { moonbeamConfig } from './moonbeam';
import { moonriverConfig } from './moonriver';
import { neurowebConfig } from './neuroweb';
import { nodleConfig } from './nodle';
import { originTrailAlphanetConfig } from './originTrailAlphanet';
import { parallelConfig } from './parallel';
import { parallelHeikoConfig } from './parallelHeiko';
import { peaqConfig } from './peaq';
import { peaqAlphanetConfig } from './peaqAlphanet';
import { peaqEvmConfig } from './peaqEvm';
import { peaqEvmAlphanetConfig } from './peaqEvmAlphanet';
import { pendulumConfig } from './pendulum';
import { pendulumAlphanetConfig } from './pendulumAlphanet';
import { phalaConfig } from './phala';
import { picassoConfig } from './picasso';
import { picassoAlphanetConfig } from './picassoAlphanet';
import { polkadotConfig } from './polkadot';
import { polkadotAssetHubConfig } from './polkadotAssetHub';
import { robonomicsConfig } from './robonomics';
import { shidenConfig } from './shiden';
import { subsocialConfig } from './subsocial';
import { tinkernetConfig } from './tinkernet';
import { turingConfig } from './turing';
import { turingAlphanetConfig } from './turingAlphanet';
import { uniqueAlphaConfig } from './uniqueAlpha';
import { zeitgeistConfig } from './zeitgeist';

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
  equilibriumConfig,
  hydraDxConfig,
  hydraDxAlphanetConfig,
  integriteeConfig,
  interlayConfig,
  karuraConfig,
  khalaConfig,
  kintsugiConfig,
  kusamaConfig,
  litmusConfig,
  mangataKusamaConfig,
  mantaParachainConfig,
  moonbaseAlphaConfig,
  moonbaseBetaConfig,
  moonbeamConfig,
  moonriverConfig,
  neurowebConfig,
  nodleConfig,
  originTrailAlphanetConfig,
  parallelConfig,
  parallelHeikoConfig,
  peaqConfig,
  peaqEvmConfig,
  peaqAlphanetConfig,
  peaqEvmAlphanetConfig,
  pendulumConfig,
  pendulumAlphanetConfig,
  phalaConfig,
  picassoConfig,
  picassoAlphanetConfig,
  polkadotConfig,
  robonomicsConfig,
  shidenConfig,
  alphanetAssetHubConfig,
  kusamaAssetHubConfig,
  polkadotAssetHubConfig,
  subsocialConfig,
  tinkernetConfig,
  turingConfig,
  turingAlphanetConfig,
  uniqueAlphaConfig,
  zeitgeistConfig,
];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfigList.map((config) => [config.chain.key, config]),
);
