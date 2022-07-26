import { Asset, Chain } from '../constants';
import { DepositConfig } from '../deposit';
import { AssetConfig, ChainConfig, MoonChainConfig } from '../interfaces';
import { WithdrawConfig } from '../withdraw';

export type ChainXcmConfigs<
  Assets extends Asset,
  Chains extends Chain,
> = Partial<Record<Asset, XcmConfig<Assets, Chains>>>;

export interface XcmConfig<Assets extends Asset, Chains extends Chain> {
  asset: AssetConfig<Assets>;
  origin: ChainConfig | MoonChainConfig;
  deposit: Partial<Record<Chains, DepositConfig<Assets>>>;
  withdraw: Partial<Record<Chains, WithdrawConfig<Assets>>>;
}
