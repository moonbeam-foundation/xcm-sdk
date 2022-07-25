import { Asset } from '../constants';
import { DepositConfig } from '../deposit';
import { AssetConfig, ChainConfig, MoonChainConfig } from '../interfaces';
import { WithdrawConfig } from '../withdraw';

export type ChainXcmConfigs<Assets extends Asset> = Readonly<
  Record<Asset, XcmConfig<Assets>>
>;

export interface XcmConfig<Assets extends Asset> {
  asset: AssetConfig<Assets>;
  origin: ChainConfig | MoonChainConfig;
  deposit: DepositConfig<Assets>[];
  withdraw: WithdrawConfig<Assets>[];
}
