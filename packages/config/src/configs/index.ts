import { ChainConfig } from '../ChainConfig';
import { acalaConfig } from './acala';
import { alphanetRelayConfig } from './alphanetRelay';
import { astarConfig } from './astar';

export const chainsConfigList: ChainConfig[] = [
  acalaConfig,
  alphanetRelayConfig,
  astarConfig,
];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfigList.map((config) => [config.chain.key, config]),
);
