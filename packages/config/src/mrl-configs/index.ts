import { ChainRoutes } from '../types/ChainRoutes';

import { fantomTestnetRoutes } from './fantomTestnet';
import { hydrationAlphanetRoutes } from './hydrationAlphanet';

export const mrlRoutesList: ChainRoutes[] = [
  fantomTestnetRoutes,
  hydrationAlphanetRoutes,
];

export const mrlRoutesMap = new Map<string, ChainRoutes>(
  mrlRoutesList.map((config) => [config.chain.key, config]),
);
