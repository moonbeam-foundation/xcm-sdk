import type { ChainRoutes } from '../types/ChainRoutes';
import { fantomTestnetRoutes } from './fantomTestnet';
import { moonbaseAlphaRoutes } from './moonbaseAlpha';
import { peaqAlphanetRoutes } from './peaqAlphanet';

export const mrlRoutesList: ChainRoutes[] = [
  fantomTestnetRoutes,
  moonbaseAlphaRoutes,
  peaqAlphanetRoutes,
];

export const mrlRoutesMap = new Map<string, ChainRoutes>(
  mrlRoutesList.map((config) => [config.chain.key, config]),
);
