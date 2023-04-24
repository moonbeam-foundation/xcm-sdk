import { AssetMinConfig } from './AssetMinConfig';

export interface AssetMinConfigBuilder {
  build: (params: AssetMinConfigBuilderPrams) => AssetMinConfig;
}

export interface AssetMinConfigBuilderPrams {
  asset: string | number | bigint;
}
