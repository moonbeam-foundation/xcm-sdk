import type { ConfigBuilder } from '../builder.interfaces';
import type { ContractConfig } from '../types/evm/ContractConfig';

export type ContractConfigBuilder = ConfigBuilder<ContractConfig>;

export type DestinationMultilocation = [
  /**
   * 1 - if transaction is going through or to a relay chain
   */
  0 | 1 | 2,
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
    /**
     * example 'Here',
     */
    | []
  ),
];

export type AssetAddressFormat = (string | bigint | undefined)[];

export enum TransferType {
  Teleport,
  LocalReserve,
  DestinationReserve,
}

export type AssetMultilocation = (bigint | (number | string[])[])[];
