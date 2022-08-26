import {
  Asset,
  AssetSymbol,
  Chain,
  ChainKey,
  MoonbaseAssets,
  MoonbaseChains,
  MoonbeamAssets,
  MoonbeamChains,
  MoonChain,
  MoonriverAssets,
  MoonriverChains,
} from '@moonbeam-network/xcm-config';
import {
  Signer as PolkadotSigner,
  UnsubscribePromise,
} from '@polkadot/api/types';
import { Signer as EthersSigner } from 'ethers';
import { AssetBalanceInfo } from '../polkadot';

export type Hash = string;

export interface XcmSdkByChain {
  moonbase: MoonbaseXcmSdk;
  moonbeam: MoonbeamXcmSdk;
  moonriver: MoonriverXcmSdk;
}

export type MoonXcmSdk = MoonbaseXcmSdk | MoonbeamXcmSdk | MoonriverXcmSdk;

export type MoonbaseXcmSdk = XcmSdk<MoonbaseAssets, MoonbaseChains>;
export type MoonbeamXcmSdk = XcmSdk<MoonbeamAssets, MoonbeamChains>;
export type MoonriverXcmSdk = XcmSdk<MoonriverAssets, MoonriverChains>;

export interface XcmSdk<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  asset: Asset<Symbols>;
  chain: MoonChain;
  subscribeToAssetsBalanceInfo: (
    account: string,
    cb: (data: AssetBalanceInfo<Symbols>[]) => void,
  ) => UnsubscribePromise;
  deposit: (symbol: Symbols) => XcmSdkDeposit<Symbols, ChainKeys>;
  withdraw: (symbol: Symbols) => XcmSdkWithdraw<Symbols, ChainKeys>;
}

export interface XcmSdkDeposit<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chains: Chain[];
  from: (chain: ChainKeys) => XcmSdkDepositFrom<Symbols>;
}

export interface XcmSdkWithdraw<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chains: Chain[];
  to: (chain: ChainKeys) => XcmSdkWithdrawTo<Symbols>;
}

export interface XcmSdkDepositFrom<Symbols extends AssetSymbol = AssetSymbol> {
  get: (
    account: string,
    sourceAccount: string,
    primaryAccount?: string,
  ) => Promise<DepositTransferData<Symbols>>;
}

export interface XcmSdkWithdrawTo<Symbols extends AssetSymbol = AssetSymbol> {
  get: (account: string) => Promise<WithdrawTransferData<Symbols>>;
}

export interface DepositTransferData<
  Symbols extends AssetSymbol = AssetSymbol,
> {
  asset: AssetConfigWithDecimals<Symbols>;
  existentialDeposit: bigint;
  min: bigint;
  moonChainFee?: bigint;
  native: AssetConfigWithDecimals<Symbols>;
  origin: MoonChain | Chain;
  source: Chain;
  sourceBalance: bigint;
  sourceFeeBalance?: FeeBalance<Symbols>;
  sourceMinBalance: bigint;
  getFee: (amount?: bigint) => Promise<bigint>;
  send: (amount: bigint, cb?: (event: ExtrinsicEvent) => void) => Promise<Hash>;
}

export interface WithdrawTransferData<
  Symbols extends AssetSymbol = AssetSymbol,
> {
  asset: AssetConfigWithDecimals<Symbols>;
  destination: Chain;
  destinationBalance: bigint;
  destinationFee: bigint;
  existentialDeposit: bigint;
  min: bigint;
  native: AssetConfigWithDecimals<Symbols>;
  origin: MoonChain | Chain;
  getFee: (amount: bigint) => Promise<bigint>;
  send: (amount: bigint, cb?: (event: ExtrinsicEvent) => void) => Promise<Hash>;
}

export interface AssetConfigWithDecimals<
  Symbols extends AssetSymbol = AssetSymbol,
> extends Asset<Symbols> {
  decimals: number;
}

export interface FeeBalance<Symbols extends AssetSymbol = AssetSymbol> {
  balance: bigint;
  decimals: number;
  symbol: Symbols;
}

export interface SdkOptions {
  ethersSigner: EthersSigner;
  polkadotSigner: PolkadotSigner;
}

export type ExtrinsicEvent =
  | ExtrinsicFailedEvent
  | ExtrinsicSentEvent
  | ExtrinsicSuccessEvent;

export interface ExtrinsicFailedEvent {
  blockHash: Hash;
  message?: string;
  status: ExtrinsicStatus.Failed;
  txHash: Hash;
}

export interface ExtrinsicSentEvent {
  status: ExtrinsicStatus.Sent;
  txHash: Hash;
}

export interface ExtrinsicSuccessEvent {
  blockHash: Hash;
  status: ExtrinsicStatus.Success;
  txHash: Hash;
}

export enum ExtrinsicStatus {
  Failed = 'Failed',
  Sent = 'Sent',
  Success = 'Success',
}
