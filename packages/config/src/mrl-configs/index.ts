import type { MrlChainRoutes } from '../types/MrlChainRoutes';
import { ethereumRoutes } from './ethereum';
import { fantomTestnetRoutes } from './fantomTestnet';
import { hydrationRoutes } from './hydration';
import { moonbaseAlphaRoutes } from './moonbaseAlpha';
import { moonbaseBetaRoutes } from './moonbaseBeta';
import { moonbeamRoutes } from './moonbeam';
import { peaqAlphanetRoutes } from './peaqAlphanet';
import { peaqEvmAlphanetRoutes } from './peaqEvmAlphanet';

export const mrlRoutesList: MrlChainRoutes[] = [
  ethereumRoutes,
  hydrationRoutes,
  fantomTestnetRoutes,
  moonbaseAlphaRoutes,
  moonbaseBetaRoutes,
  moonbeamRoutes,
  peaqAlphanetRoutes,
  peaqEvmAlphanetRoutes,
];

export const mrlRoutesMap = new Map<string, MrlChainRoutes>(
  mrlRoutesList.map((config) => [config.chain.key, config]),
);
