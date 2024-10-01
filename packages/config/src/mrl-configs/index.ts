import type { ChainRoutes } from '../types/ChainRoutes';
import { fantomTestnetRoutes } from './fantomTestnet';
import { moonbaseAlphaRoutes } from './moonbaseAlpha';

export const mrlRoutesList: ChainRoutes[] = [
  fantomTestnetRoutes,
  moonbaseAlphaRoutes,
];

export const mrlRoutesMap = new Map<string, ChainRoutes>(
  mrlRoutesList.map((config) => [config.chain.key, config]),
);
