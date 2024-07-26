import { ChainRoutes } from '../types/ChainRoutes';

export const routesList: ChainRoutes[] = [];

export const routesMap = new Map<string, ChainRoutes>(
  routesList.map((config) => [config.chain.key, config]),
);
