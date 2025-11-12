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
import { interlayRoutes } from './interlay';
import { karuraRoutes } from './karura';
import { kintsugiRoutes } from './kintsugi';
import { kusamaAssetHubRoutes } from './kusamaAssetHub';
import { laosRoutes } from './laos';
import { laosAlphanetRoutes } from './laosAlphanet';
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
import { polkadotAssetHubRoutes } from './polkadotAssetHub';
import { robonomicsRoutes } from './robonomics';
import { shidenRoutes } from './shiden';
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
  interlayRoutes,
  karuraRoutes,
  kintsugiRoutes,
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
  robonomicsRoutes,
  shidenRoutes,
  alphanetAssetHubRoutes,
  kusamaAssetHubRoutes,
  polkadotAssetHubRoutes,
  turingAlphanetRoutes,
  zeitgeistRoutes,
];

export const xcmRoutesMap = new Map<string, ChainRoutes>(
  xcmRoutesList.map((config) => [config.chain.key, config]),
);
