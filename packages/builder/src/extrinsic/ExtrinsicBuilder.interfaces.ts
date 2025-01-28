import type { ConfigBuilder } from '../builder.interfaces';
import type { ExtrinsicConfig } from '../types/substrate/ExtrinsicConfig';

export type ExtrinsicConfigBuilder = ConfigBuilder<ExtrinsicConfig>;

export enum XcmVersion {
  v1 = 'V1',
  v2 = 'V2',
  v3 = 'V3',
  v4 = 'V4',
  v5 = 'V5',
}

export type Parents = 0 | 1;
