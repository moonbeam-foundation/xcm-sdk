import type { ChainRoutes } from '../types/ChainRoutes';
import { moonbaseBetaRoutes } from './moonbaseBeta';
import { moonbaseStageRoutes } from './moonbaseStage';
import { moonbeamRoutes } from './moonbeam';
import { moonlamaRoutes } from './moonlama';
import { moonriverRoutes } from './moonriver';
import { moonsamaRoutes } from './moonsama';

export const crossEcosystemsRoutesList: ChainRoutes[] = [
  moonbaseBetaRoutes,
  moonbaseStageRoutes,
  moonlamaRoutes,
  moonsamaRoutes,
  moonriverRoutes,
  moonbeamRoutes,
];

export const crossEcosystemsRoutesMap = new Map<string, ChainRoutes>(
  crossEcosystemsRoutesList.map((config) => [config.chain.key, config]),
);
