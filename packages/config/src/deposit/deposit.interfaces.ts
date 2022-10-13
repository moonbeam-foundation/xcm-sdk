import { BalanceConfig, MinBalanceConfig } from '../balance';
import { AssetSymbol, ChainKey } from '../constants';
import { ExtrinsicConfig } from '../extrinsic';
import { Asset, Chain } from '../interfaces';

export interface DepositConfig<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  /**
   * Balance of asset being sent
   */
  balance: BalanceConfig<Symbols>;
  /**
   * Deposit extrinsic
   */
  extrinsic: ExtrinsicConfig<Symbols>;
  /**
   * Chain where the asset(s) will be sent from
   */
  source: Chain<ChainKeys>;
  /**
   * Optional - Balance config for the native token (the one that will pay the
   * extrinsic fees). Needed if the asset being sent is NOT the native token
   * of the origin chain (is not the asset paying for the extrinsic fees).
   */
  sourceFeeBalance?: BalanceConfig<Symbols>;
  /**
   * Optional - Config for querying the minimum balance for the asset in the
   * foreign chain.
   */
  sourceMinBalance?: MinBalanceConfig;
  /**
   * Optional - Asset to pay for the XCM fee in Moon*. Needed if the asset being
   * sent is not accepted as XCM fee payment method.
   */
  xcmFeeAsset?: {
    balance: BalanceConfig<Symbols>;
    asset: Asset<Symbols>;
  };
}
