import {
  Asset,
  AssetConfig,
  Chain,
  ChainConfig,
  MoonbaseAssets,
  MoonbaseChains,
  MoonbeamAssets,
  MoonbeamChains,
  MoonChainConfig,
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
  Assets extends Asset = Asset,
  Chains extends Chain = Chain,
> {
  asset: AssetConfig<Assets>;
  chain: MoonChainConfig;
  subscribeToAssetsBalanceInfo: (
    account: string,
    cb: (data: AssetBalanceInfo<Assets>[]) => void,
  ) => UnsubscribePromise;
  deposit: (asset: Assets) => XcmSdkDeposit<Assets, Chains>;
  withdraw: (asset: Assets) => XcmSdkWithdraw<Assets, Chains>;
}

export interface XcmSdkDeposit<
  Assets extends Asset = Asset,
  Chains extends Chain = Chain,
> {
  chains: ChainConfig[];
  from: (chain: Chains) => XcmSdkDepositFrom<Assets>;
}

export interface XcmSdkWithdraw<
  Assets extends Asset = Asset,
  Chains extends Chain = Chain,
> {
  chains: ChainConfig[];
  to: (chain: Chains) => XcmSdkDepositTo<Assets>;
}

export interface XcmSdkDepositFrom<Assets extends Asset = Asset> {
  get: (
    account: string,
    primaryAccount?: string,
  ) => Promise<DepositTransferData<Assets>>;
}

export interface XcmSdkDepositTo<Assets extends Asset = Asset> {
  get: (account: string) => Promise<WithdrawTransferData<Assets>>;
}

export interface DepositTransferData<Assets extends Asset = Asset> {
  asset: AssetConfigWithDecimals<Assets>;
  native: NativeAsset<Assets>;
  origin: MoonChainConfig | ChainConfig;
  source: ChainConfig;
  sourceBalance: bigint;
  existentialDeposit: bigint;
  minBalance?: bigint;
  extrinsicFeeBalance?: ExtrinsicFeeBalance<Assets>;
  send: (amount: bigint, cb?: (event: ExtrinsicEvent) => void) => Promise<Hash>;
}

export interface WithdrawTransferData<Assets extends Asset = Asset> {
  asset: AssetConfigWithDecimals<Assets>;
  native: NativeAsset<Assets>;
  origin: MoonChainConfig | ChainConfig;
  destination: ChainConfig;
  destinationBalance: bigint;
  destinationFee: bigint;
  existentialDeposit: bigint;
  getFee: (amount: bigint) => Promise<bigint>;
  send: (amount: bigint, cb?: (event: ExtrinsicEvent) => void) => Promise<Hash>;
}

export interface AssetConfigWithDecimals<Assets extends Asset = Asset>
  extends AssetConfig<Assets> {
  decimals: number;
}

export interface NativeAsset<Assets extends Asset = Asset> {
  decimals: number;
  symbol: Assets;
}

export interface ExtrinsicFeeBalance<Assets extends Asset = Asset> {
  amount: bigint;
  decimals: number;
  symbol: Assets;
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
  status: ExtrinsicStatus.Failed;
  message?: string;
  blockHash: Hash;
}

export interface ExtrinsicSentEvent {
  status: ExtrinsicStatus.Sent;
}

export interface ExtrinsicSuccessEvent {
  status: ExtrinsicStatus.Success;
  blockHash: Hash;
}

export enum ExtrinsicStatus {
  Failed = 'Failed',
  Sent = 'Sent',
  Success = 'Success',
}
