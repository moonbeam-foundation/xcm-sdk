import { BalanceConfig, MinBalanceConfig } from '../balance';
import { Asset } from '../constants';
import { ExtrinsicConfig } from '../extrinsic';
import { ChainConfig } from '../interfaces';

export interface DepositConfig<Assets extends Asset = Asset> {
  balance: BalanceConfig<Assets>;
  extrinsic: ExtrinsicConfig<Assets>;
  sourceFeeBalance?: BalanceConfig<Assets>;
  sourceMinBalance?: MinBalanceConfig;
  isNativeAssetPayingMoonFee?: boolean;
  origin: ChainConfig;
}
