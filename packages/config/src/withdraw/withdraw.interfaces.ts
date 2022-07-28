import { BalanceConfig } from '../balance';
import { Asset } from '../constants';
import { ChainConfig } from '../interfaces';

export type WithdrawConfig<Assets extends Asset> =
  WithdrawXTokensConfig<Assets>;

export interface WithdrawXTokensConfig<Assets extends Asset> {
  balance: BalanceConfig<Assets>;
  destination: ChainConfig;
  existentialDeposit: number | bigint;
  feePerWeight: number;
  weight: number | bigint;
  getParams: (account: string) => DestinationML;
}

export type DestinationML = [
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

export interface WithdrawXTokensOptions<Assets extends Asset> {
  balance: BalanceConfig<Assets>;
  destination: ChainConfig;
  existentialDeposit?: number | bigint;
  feePerWeight: number;
  weight?: number | bigint;
}
