import type { MrlChainRoutes } from '../types/MrlChainRoutes';
import { fantomTestnetRoutes } from './fantomTestnet';
import { moonbaseAlphaRoutes } from './moonbaseAlpha';
import { moonbaseBetaRoutes } from './moonbaseBeta';
import { peaqAlphanetRoutes } from './peaqAlphanet';
import { peaqEvmAlphanetRoutes } from './peaqEvmAlphanet';

export const mrlRoutesList: MrlChainRoutes[] = [
  fantomTestnetRoutes,
  moonbaseAlphaRoutes,
  moonbaseBetaRoutes,
  peaqAlphanetRoutes,
  peaqEvmAlphanetRoutes,
];

export const mrlRoutesMap = new Map<string, MrlChainRoutes>(
  mrlRoutesList.map((config) => [config.chain.key, config]),
);
