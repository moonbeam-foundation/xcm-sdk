import { BalanceConfig, MinBalanceConfig } from '../balance';
import { AssetSymbol, ChainKey } from '../constants';
import { Asset, Chain } from '../interfaces';

export type WithdrawConfig<Symbols extends AssetSymbol = AssetSymbol> =
  WithdrawXTokensConfig<Symbols>;

export interface WithdrawXTokensConfig<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  balance: BalanceConfig<Symbols>;
  destination: Chain<ChainKeys>;
  feePerWeight: number;
  sourceMinBalance?: MinBalanceConfig;
  xcmFeeAsset?: Asset<Symbols>;
  weight: number;
  getParams: (account: string) => WithdrawXTokensParams;
}

export type WithdrawXTokensParams = [
  /**
   * 1 - if transaction is going through a relay chain
   */
  1,
  (
    | [
        /**
         * example '0x00000007DC'
         * 7DC - parachain id in hex
         * can be found here:
         *   - https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.polkadot.io#/parachains
         *   - https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/parachains
         */
        string,
        /**
         * example '0x01%account%00',
         * enum = 01 (AccountId32)
         * networkId = 00 (any)
         */
        string,
      ]
    | [
        /**
         * example '0x01%account%00',
         * enum = 01 (AccountId32)
         * networkId = 00 (any)
         */
        string,
      ]
  ),
];

export interface WithdrawXTokensOptions<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  balance: BalanceConfig<Symbols>;
  destination: Chain<ChainKeys>;
  feePerWeight: number;
  sourceMinBalance?: MinBalanceConfig;
  weight?: number;
  xcmFeeAsset?: Asset<Symbols>;
}
