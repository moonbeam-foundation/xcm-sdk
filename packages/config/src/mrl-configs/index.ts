import { ChainRoutes } from '../types/ChainRoutes';
import { hydrationAlphanetRoutes } from './hydrationAlphanet';

export const mrlRoutesList: ChainRoutes[] = [hydrationAlphanetRoutes];

export const mrlRoutesMap = new Map<string, ChainRoutes>(
  mrlRoutesList.map((config) => [config.chain.key, config]),
);
