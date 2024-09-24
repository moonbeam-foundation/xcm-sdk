import type { ChainRoutes } from '../types/ChainRoutes';
import { fantomTestnetRoutes } from './fantomTestnet';

export const mrlRoutesList: ChainRoutes[] = [fantomTestnetRoutes];

export const mrlRoutesMap = new Map<string, ChainRoutes>(
  mrlRoutesList.map((config) => [config.chain.key, config]),
);
