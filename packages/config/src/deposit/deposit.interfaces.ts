import { MinBalanceConfig, BalanceConfig } from '../balance';
import { Asset } from '../constants';
import { ExtrinsicConfig } from '../extrinsic';
import { AssetConfig, ChainConfig } from '../interfaces';

export interface DepositConfig<Assets extends Asset> {
  balance: BalanceConfig<Assets>;
  extrinsic: ExtrinsicConfig<Assets>;
  extrinsicFeeBalance?: BalanceConfig<Assets>;
  minBalance?: MinBalanceConfig;
  origin: ChainConfig;
  xcmFeeAsset?: AssetConfig<Assets>;
}
