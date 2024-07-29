import { ChainRoutes } from '../types/ChainRoutes';
import { hydrationAlphanetRoutes } from './hydrationAlphanet';

export const routesList: ChainRoutes[] = [hydrationAlphanetRoutes];

export const routesMap = new Map<string, ChainRoutes>(
  routesList.map((config) => [config.chain.key, config]),
);
