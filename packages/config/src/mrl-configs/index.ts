import type { ChainRoutes } from '../types/ChainRoutes';
import { fantomTestnetRoutes } from './fantomTestnet';
import { moonbaseAlphaRoutes } from './moonbaseAlpha';
import { moonbaseBetaRoutes } from './moonbaseBeta';
import { peaqAlphanetRoutes } from './peaqAlphanet';
import { peaqEvmAlphanetRoutes } from './peaqEvmAlphanet';

export const mrlRoutesList: ChainRoutes[] = [
  fantomTestnetRoutes,
  moonbaseAlphaRoutes,
  moonbaseBetaRoutes,
  peaqAlphanetRoutes,
  peaqEvmAlphanetRoutes,
];

export const mrlRoutesMap = new Map<string, ChainRoutes>(
  mrlRoutesList.map((config) => [config.chain.key, config]),
);
