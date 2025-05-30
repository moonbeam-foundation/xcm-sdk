import type { ChainRoutes } from '../types/ChainRoutes';
import { moonbaseBetaRoutes } from './moonbaseBeta';
import { moonbaseStageRoutes } from './moonbaseStage';

export const crossEcosystemsRoutesList: ChainRoutes[] = [
  moonbaseBetaRoutes,
  moonbaseStageRoutes,
];

export const crossEcosystemsRoutesMap = new Map<string, ChainRoutes>(
  crossEcosystemsRoutesList.map((config) => [config.chain.key, config]),
);
