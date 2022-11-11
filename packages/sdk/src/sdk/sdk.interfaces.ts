import {
  Asset,
  AssetsMap,
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
import { ExtrinsicEventsCallback, Hash } from '@moonbeam-network/xcm-utils';
import type {
  Signer as PolkadotSigner,
  UnsubscribePromise,
} from '@polkadot/api/types';
import type { IKeyringPair } from '@polkadot/types/types';
import type { Signer as EthersSigner } from 'ethers';
import { AssetBalanceInfo } from '../polkadot';

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
  symbols: Symbols[];
  assets: AssetsMap<Symbols>;
  moonAsset: Asset<Symbols>;
  moonChain: MoonChain;
  subscribeToAssetsBalanceInfo: (
    account: string,
    cb: (data: AssetBalanceInfo<Symbols>[]) => void,
  ) => UnsubscribePromise;
  deposit: (
    symbolOrAsset: Symbols | Asset<Symbols>,
  ) => XcmSdkDeposit<Symbols, ChainKeys>;
  withdraw: (
    symbolOrAsset: Symbols | Asset<Symbols>,
  ) => XcmSdkWithdraw<Symbols, ChainKeys>;
}

export interface XcmSdkDeposit<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chains: Chain<ChainKeys>[];
  from: (
    keyOrChain: ChainKeys | Chain<ChainKeys>,
  ) => XcmSdkDepositFrom<Symbols>;
}

export interface XcmSdkWithdraw<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chains: Chain<ChainKeys>[];
  to: (keyOrChain: ChainKeys | Chain<ChainKeys>) => XcmSdkWithdrawTo<Symbols>;
}

export interface XcmSdkDepositFrom<Symbols extends AssetSymbol = AssetSymbol> {
  get: (
    account: string,
    sourceAccount: string | IKeyringPair,
    params?: DepositGetParams,
  ) => Promise<DepositTransferData<Symbols>>;
}

export interface DepositGetParams {
  polkadotSigner?: PolkadotSigner;
  primaryAccount?: string;
}

export interface XcmSdkWithdrawTo<Symbols extends AssetSymbol = AssetSymbol> {
  get: (
    destinationAccount: string,
    originAccount?: string,
    params?: WithdrawGetParams,
  ) => Promise<WithdrawTransferData<Symbols>>;
}

export interface WithdrawGetParams {
  ethersSigner?: EthersSigner;
}

export interface DepositTransferData<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  asset: AssetWithDecimals<Symbols>;
  existentialDeposit: bigint;
  min: bigint;
  moonChainFee: XcmFeeWithBalance<Symbols>;
  native: AssetWithDecimals<Symbols>;
  origin: MoonChain | Chain<ChainKeys>;
  source: Chain<ChainKeys>;
  sourceBalance: bigint;
  sourceFeeBalance?: Balance<Symbols>;
  sourceMinBalance: bigint;
  getFee: (amount?: bigint) => Promise<bigint>;
  send: (amount: bigint, cb?: ExtrinsicEventsCallback) => Promise<Hash>;
}

export interface WithdrawTransferData<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  asset: AssetWithDecimals<Symbols>;
  destination: Chain<ChainKeys>;
  destinationBalance: bigint;
  destinationFee: bigint;
  existentialDeposit: bigint;
  min: XcmFeeWithDecimals<Symbols>;
  minXcmFeeAsset: XcmFeeWithDecimals<Symbols>;
  native: AssetWithDecimals<Symbols>;
  origin: MoonChain | Chain<ChainKeys>;
  originXcmFeeAssetBalanceNotEnough: boolean;
  getFee: (amount: bigint) => Promise<bigint>;
  send: (amount: bigint, cb?: ExtrinsicEventsCallback) => Promise<Hash>;
}

export interface AssetWithDecimals<Symbols extends AssetSymbol = AssetSymbol>
  extends Asset<Symbols> {
  decimals: number;
}

export interface XcmFeeWithDecimals<Symbols extends AssetSymbol = AssetSymbol> {
  amount: bigint;
  decimals: number;
  symbol: Symbols;
}

export interface Balance<Symbols extends string | AssetSymbol = AssetSymbol> {
  balance: bigint;
  decimals: number;
  symbol: Symbols;
}

export interface XcmFeeWithBalance<
  Symbols extends string | AssetSymbol = AssetSymbol,
> extends Balance<Symbols> {
  fee: bigint;
}

export interface SdkOptions {
  ethersSigner?: EthersSigner;
  polkadotSigner?: PolkadotSigner;
}
