import type { ChainRoutes } from '../types/ChainRoutes';
import { moonbaseBetaRoutes } from './moonbaseBeta';
import { moonbaseStageRoutes } from './moonbaseStage';
import { moonlamaRoutes } from './moonlama';
import { moonsamaRoutes } from './moonsama';

export const crossEcosystemsRoutesList: ChainRoutes[] = [
  moonbaseBetaRoutes,
  moonbaseStageRoutes,
  moonlamaRoutes,
  moonsamaRoutes,
];

export const crossEcosystemsRoutesMap = new Map<string, ChainRoutes>(
  crossEcosystemsRoutesList.map((config) => [config.chain.key, config]),
);
