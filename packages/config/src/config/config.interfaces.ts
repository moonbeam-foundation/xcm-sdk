import { Asset, Chain } from '../constants';
import { DepositConfig } from '../deposit';
import { AssetConfig, ChainConfig, MoonChainConfig } from '../interfaces';
import { WithdrawConfig } from '../withdraw';

export interface DepositConfigGetter<
  Assets extends Asset = Asset,
  Chains extends Chain = Chain,
> {
  chains: ChainConfig[];
  from: (chain: Chains) => {
    asset: AssetConfig<Assets>;
    origin: ChainConfig | MoonChainConfig;
    config: DepositConfig<Assets>;
  };
}

export interface WithdrawConfigGetter<
  Assets extends Asset = Asset,
  Chains extends Chain = Chain,
> {
  chains: ChainConfig[];
  to: (chain: Chains) => {
    asset: AssetConfig<Assets>;
    origin: ChainConfig | MoonChainConfig;
    config: WithdrawConfig<Assets>;
  };
}

export interface ConfigGetter<
  Assets extends Asset = Asset,
  Chains extends Chain = Chain,
> {
  asset: AssetConfig<Assets>;
  assets: AssetsConfigs<Assets>;
  chain: MoonChainConfig;
  deposit: (asset: Assets) => DepositConfigGetter<Assets, Chains>;
  withdraw: (asset: Assets) => WithdrawConfigGetter<Assets, Chains>;
}

export type AssetsConfigs<Assets extends Asset = Asset> = Readonly<
  Record<Assets, AssetConfig<Assets>>
>;

export type ChainsConfigs<Chains extends Chain = Chain> = Readonly<
  Record<Chains, ChainConfig>
>;

export type ChainXcmConfigs<
  Assets extends Asset = Asset,
  Chains extends Chain = Chain,
> = Partial<Record<Asset, XcmConfig<Assets, Chains>>>;

export interface XcmConfig<
  Assets extends Asset = Asset,
  Chains extends Chain = Chain,
> {
  asset: AssetConfig<Assets>;
  origin: ChainConfig | MoonChainConfig;
  deposit: Partial<Record<Chains, DepositConfig<Assets>>>;
  withdraw: Partial<Record<Chains, WithdrawConfig<Assets>>>;
}
