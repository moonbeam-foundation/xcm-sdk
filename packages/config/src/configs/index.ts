import { ChainConfig } from '../ChainConfig';
import { acalaConfig } from './acala';

export const chainsConfigList: ChainConfig[] = [acalaConfig];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfigList.map((config) => [config.chain.key, config]),
);
