import { ChainConfig } from '../ChainConfig';
import { acalaConfig } from './acala';
import { alphanetRelayConfig } from './alphanetRelay';

export const chainsConfigList: ChainConfig[] = [
  acalaConfig,
  alphanetRelayConfig,
];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfigList.map((config) => [config.chain.key, config]),
);
