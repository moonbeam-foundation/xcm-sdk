import { DepositConfig } from '../deposit';
import { AssetConfig, ChainConfig, MoonChainConfig } from '../interfaces';
import { WithdrawConfig } from '../withdraw';

export type ChainXcmConfigs<Asset extends string> = Record<
  Asset,
  XcmConfig<Asset>
>;

export interface XcmConfig<Asset> {
  asset: AssetConfig<Asset>;
  origin: ChainConfig | MoonChainConfig;
  deposit: DepositConfig<Asset>[];
  withdraw: WithdrawConfig<Asset>[];
}
