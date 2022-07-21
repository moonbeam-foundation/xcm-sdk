import { MinBalanceConfig, BalanceConfig } from '../balance';
import { ExtrinsicConfig } from '../extrinsic';
import { AssetConfig, ChainConfig } from '../interfaces';

export interface DepositConfig<Asset> {
  balance: BalanceConfig<Asset>;
  extrinsic: ExtrinsicConfig<Asset>;
  extrinsicFeeBalance?: BalanceConfig<Asset>;
  minBalance?: MinBalanceConfig;
  origin: ChainConfig;
  xcmFeeAsset?: AssetConfig<Asset>;
}
