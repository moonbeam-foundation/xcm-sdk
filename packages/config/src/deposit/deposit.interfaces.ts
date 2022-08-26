import { BalanceConfig, MinBalanceConfig } from '../balance';
import { AssetSymbol } from '../constants';
import { ExtrinsicConfig } from '../extrinsic';
import { Chain } from '../interfaces';

export interface DepositConfig<Symbols extends AssetSymbol = AssetSymbol> {
  balance: BalanceConfig<Symbols>;
  extrinsic: ExtrinsicConfig<Symbols>;
  isNativeAssetPayingMoonFee?: boolean;
  origin: Chain;
  sourceFeeBalance?: BalanceConfig<Symbols>;
  sourceMinBalance?: MinBalanceConfig;
}
