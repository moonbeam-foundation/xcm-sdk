import { AssetSymbol, ChainKey } from '../constants';
import { DepositConfig } from '../deposit';
import { Asset, Chain, MoonChain } from '../interfaces';
import { WithdrawConfig } from '../withdraw';

export interface ConfigGetter<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  assets: AssetsConfigs<Symbols>;
  moonAsset: Asset<Symbols>;
  moonChain: MoonChain;
  deposit: (symbol: Symbols) => DepositConfigGetter<Symbols, ChainKeys>;
  withdraw: (symbol: Symbols) => WithdrawConfigGetter<Symbols, ChainKeys>;
}

export interface DepositConfigGetter<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chains: Chain<ChainKeys>[];
  from: (chain: ChainKeys) => {
    asset: Asset<Symbols>;
    origin: Chain<ChainKeys> | MoonChain;
    config: DepositConfig<Symbols>;
  };
}

export interface WithdrawConfigGetter<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chains: Chain<ChainKeys>[];
  to: (chain: ChainKeys) => {
    asset: Asset<Symbols>;
    origin: Chain<ChainKeys> | MoonChain;
    config: WithdrawConfig<Symbols>;
  };
}

export type AssetsConfigs<Symbols extends AssetSymbol = AssetSymbol> = Record<
  Symbols,
  Asset<Symbols>
>;

export type ChainsConfigs<ChainKeys extends ChainKey = ChainKey> = Record<
  ChainKeys,
  Chain<ChainKeys>
>;

export type ChainXcmConfigs<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> = Partial<Record<AssetSymbol, XcmConfig<Symbols, ChainKeys>>>;

export interface XcmConfig<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  asset: Asset<Symbols>;
  origin: Chain<ChainKeys> | MoonChain;
  deposit: Partial<Record<ChainKeys, DepositConfig<Symbols>>>;
  withdraw: Partial<Record<ChainKeys, WithdrawConfig<Symbols>>>;
}
