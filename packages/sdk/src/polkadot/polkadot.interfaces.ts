import {
  Asset,
  AssetSymbol,
  Chain,
  MoonChain,
} from '@moonbeam-network/xcm-config';

export interface AssetMetadata<Symbols extends AssetSymbol = AssetSymbol> {
  decimals: number;
  symbol: string;
  originSymbol?: Symbols;
}

export interface AssetBalanceInfo<Symbols extends AssetSymbol = AssetSymbol> {
  asset: Asset<Symbols>;
  balance: bigint;
  meta: AssetMetadata<Symbols>;
  origin: Chain | MoonChain;
}
