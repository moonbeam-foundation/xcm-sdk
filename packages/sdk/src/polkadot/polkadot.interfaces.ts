import {
  Asset,
  AssetConfig,
  ChainConfig,
  MoonChainConfig,
} from '@moonbeam-network/xcm-config';

export interface AssetMetadata<Assets extends Asset = Asset> {
  decimals: number;
  symbol: string;
  originSymbol?: Assets;
}

export interface AssetBalanceInfo<Assets extends Asset = Asset> {
  asset: AssetConfig<Assets>;
  balance: bigint;
  meta: AssetMetadata<Assets>;
  origin: ChainConfig | MoonChainConfig;
}
