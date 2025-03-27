import type { ChainRoutes } from '../types/ChainRoutes';

import { acalaRoutes } from './acala';
import { alphanetAssetHubRoutes } from './alphanetAssetHub';
import { alphanetRelayRoutes } from './alphanetRelay';
import { astarRoutes } from './astar';
import { bifrostKusamaRoutes } from './bifrostKusama';
import { bifrostPolkadotRoutes } from './bifrostPolkadot';
import { centrifugeRoutes } from './centrifuge';
import { crustShadowRoutes } from './crustShadow';
import { darwiniaRoutes } from './darwinia';
import { darwiniaCrabRoutes } from './darwiniaCrab';
import { hydrationRoutes } from './hydration';
import { hydrationAlphanetRoutes } from './hydrationAlphanet';
import { integriteeRoutes } from './integritee';
import { interlayRoutes } from './interlay';
import { karuraRoutes } from './karura';
import { kintsugiRoutes } from './kintsugi';
import { kusamaRoutes } from './kusama';
import { kusamaAssetHubRoutes } from './kusamaAssetHub';
import { laosRoutes } from './laos';
import { laosAlphanetRoutes } from './laosAlphanet';
import { mangataKusamaRoutes } from './mangataKusama';
import { mantaParachainRoutes } from './mantaParachain';
import { moonbaseAlphaRoutes } from './moonbaseAlpha';
import { moonbaseBetaRoutes } from './moonbaseBeta';
import { moonbeamRoutes } from './moonbeam';
import { moonriverRoutes } from './moonriver';
import { neurowebRoutes } from './neuroweb';
import { originTrailAlphanetRoutes } from './originTrailAlphanet';
import { peaqRoutes } from './peaq';
import { peaqAlphanetRoutes } from './peaqAlphanet';
import { peaqEvmRoutes } from './peaqEvm';
import { peaqEvmAlphanetRoutes } from './peaqEvmAlphanet';
import { pendulumRoutes } from './pendulum';
import { pendulumAlphanetRoutes } from './pendulumAlphanet';
import { phalaRoutes } from './phala';
import { polkadotRoutes } from './polkadot';
import { polkadotAssetHubRoutes } from './polkadotAssetHub';
import { robonomicsRoutes } from './robonomics';
import { shidenRoutes } from './shiden';
import { subsocialRoutes } from './subsocial';
import { turingRoutes } from './turing';
import { turingAlphanetRoutes } from './turingAlphanet';
import { zeitgeistRoutes } from './zeitgeist';

export const xcmRoutesList: ChainRoutes[] = [
  acalaRoutes,
  alphanetRelayRoutes,
  astarRoutes,
  bifrostKusamaRoutes,
  bifrostPolkadotRoutes,
  centrifugeRoutes,
  crustShadowRoutes,
  darwiniaRoutes,
  darwiniaCrabRoutes,
  laosAlphanetRoutes,
  laosRoutes,
  hydrationRoutes,
  hydrationAlphanetRoutes,
  integriteeRoutes,
  interlayRoutes,
  karuraRoutes,
  kintsugiRoutes,
  kusamaRoutes,
  mangataKusamaRoutes,
  mantaParachainRoutes,
  moonbaseAlphaRoutes,
  moonbaseBetaRoutes,
  moonbeamRoutes,
  moonriverRoutes,
  neurowebRoutes,
  originTrailAlphanetRoutes,
  peaqRoutes,
  peaqEvmRoutes,
  peaqAlphanetRoutes,
  peaqEvmAlphanetRoutes,
  pendulumRoutes,
  pendulumAlphanetRoutes,
  phalaRoutes,
  polkadotRoutes,
  robonomicsRoutes,
  shidenRoutes,
  alphanetAssetHubRoutes,
  kusamaAssetHubRoutes,
  polkadotAssetHubRoutes,
  subsocialRoutes,
  turingRoutes,
  turingAlphanetRoutes,
  zeitgeistRoutes,
];

export const xcmRoutesMap = new Map<string, ChainRoutes>(
  xcmRoutesList.map((config) => [config.chain.key, config]),
);
