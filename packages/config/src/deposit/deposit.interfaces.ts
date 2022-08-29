import { BalanceConfig, MinBalanceConfig } from '../balance';
import { AssetSymbol, ChainKey } from '../constants';
import { ExtrinsicConfig } from '../extrinsic';
import { Chain } from '../interfaces';

export interface DepositConfig<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  balance: BalanceConfig<Symbols>;
  extrinsic: ExtrinsicConfig<Symbols>;
  isNativeAssetPayingMoonFee?: boolean;
  origin: Chain<ChainKeys>;
  sourceFeeBalance?: BalanceConfig<Symbols>;
  sourceMinBalance?: MinBalanceConfig;
}
