/* eslint-disable import/no-cycle */
import { Assets as MoonbaseAssets } from '../moonbase-alpha/assets.moonbase';
import { Assets as MoonbeamAssets } from '../moonbeam/assets.moonbeam';
import { Assets as MoonriverAssets } from '../moonriver/assets.moonriver';
import { PolkadotXcmPallet, XcmPallet } from './PolkadotXcmPallet.interface';
import { XTokensPallet } from './XTokensPallet.interface';
import { XTransferPallet } from './XTransferPallet.interface';

export type AllNetworkAssets =
  | MoonbaseAssets
  | MoonbeamAssets
  | MoonriverAssets;

export type XcmConfigs<Assets extends string> = Record<
  AssetsConfig<Assets>[Assets]['id'],
  XcmConfig<Assets>
>;

type AssetsConfig<Assets extends string> = {
  [K in Assets]: {
    id: string;
    originSymbol: K;
  };
};

export interface XcmConfig<Assets extends string> {
  assetId: AssetsConfig<Assets>[Assets]['id'];
  originSymbol: Assets;
  originName: string;
  deposit: DepositXcmConfig<Assets>[];
  withdraw: WithdrawXcmConfig<Assets>[];
}

export interface NativeTokenConfig<Assets extends string> {
  deposit: DepositXcmConfig<Assets>[];
  withdraw: WithdrawXcmConfig<Assets>[];
}

export interface DepositXcmConfig<Assets extends string> extends ChainConfig {
  xcmExtrinsic:
    | XTokensPallet<Assets>
    | PolkadotXcmPallet
    | XcmPallet
    | XTransferPallet;
  assetBalance: BalanceConfig<Assets>;
  extrinsicFeeBalance?: BalanceConfig<Assets>;
  assetMinBalance?: AssetMinBalanceConfig;
  xcmFeeBalance?: {
    assetId: AssetsConfig<Assets>[Assets]['id'];
    symbol: Assets;
  };
}

export interface ChainConfig {
  name: string;
  ws: string;
  parachainId?: number;
  weight: number;
  explorer?: string;
}

export interface WithdrawXcmConfig<Assets extends string> extends ChainConfig {
  getDestinationML: (account: string) => DestinationML;
  weight: number;
  feePerWeight: number;
  existentialDeposit: number;
  assetBalance: BalanceConfig<Assets>;
}

export type DestinationML = [
  /**
   * parent 0 or 1 - if transaction is going through a relay chain
   */
  number,
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

export type BalanceConfig<Assets extends string> =
  | SystemBalanceConfig
  | AssetsBalanceConfig
  | TokensBalanceConfig<Assets>;

export interface AssetMinBalanceConfig {
  pallet: 'assets';
  function: 'asset';
  params: [number];
  path: ['minBalance'];
}

export interface SystemBalanceConfig {
  pallet: 'system';
  function: 'account';
  getParams: (account: string) => [string];
  path: ['data'];
  calc: (data: any) => bigint; // TODO: remove any
}

export interface AssetsBalanceConfig {
  pallet: 'assets';
  function: 'account';
  getParams: (account: string) => [number, string];
  path: ['balance'];
}

export interface TokensBalanceConfig<Assets extends string> {
  pallet: 'tokens';
  function: 'accounts';
  getParams: (account: string) => [
    string,
    (
      | {
          Token: Assets | 'MOVR' | 'KUSD';
        }
      | { ForeignAsset: number }
    ),
  ];
  path: ['free'];
}
