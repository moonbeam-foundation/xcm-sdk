import { QueryConfig } from '../QueryConfig';

export interface AssetMinConfigBuilder {
  build: (params: AssetMinConfigBuilderPrams) => QueryConfig;
}

export interface AssetMinConfigBuilderPrams {
  asset: string | number | bigint;
}
