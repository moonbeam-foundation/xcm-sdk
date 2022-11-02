import { BalanceConfig } from '../balance';
import { AssetSymbol, ChainKey } from '../constants';
import { DepositConfig } from '../deposit';
import { Asset, Chain, MoonChain } from '../interfaces';
import { GetterAccountMultilocationV1 } from '../multilocation';
import {
  XcmTransactThroughSigned,
  XcmTransactThroughSignedMultilocation,
} from '../transact';
import { WithdrawConfig } from '../withdraw';

export interface CreateConfigParams<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  assets: AssetsMap<Symbols>;
  moonAsset: Asset<Symbols>;
  moonChain: MoonChain;
  chains: ChainsMap<ChainKeys>;
  configs: ChainXcmConfigs<Symbols, ChainKeys>;
  transact: ChainTransactConfigs<Symbols, ChainKeys>;
}

export interface XcmConfigBuilder<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  symbols: Symbols[];
  assets: AssetsMap<Symbols>;
  moonAsset: Asset<Symbols>;
  moonChain: MoonChain;
  deposit: (
    symbolOrAsset: Symbols | Asset<Symbols>,
  ) => DepositConfigBuilder<Symbols, ChainKeys>;
  withdraw: (
    symbolOrAsset: Symbols | Asset<Symbols>,
  ) => WithdrawConfigBuilder<Symbols, ChainKeys>;
  transact: () => TransactConfigBuilder<Symbols, ChainKeys>;
}

export interface DepositConfigBuilder<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chains: Chain<ChainKeys>[];
  from: (keyOrChain: ChainKeys | Chain<ChainKeys>) => {
    asset: Asset<Symbols>;
    origin: Chain<ChainKeys> | MoonChain;
    config: DepositConfig<Symbols>;
  };
}

export interface WithdrawConfigBuilder<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chains: Chain<ChainKeys>[];
  to: (keyOrChain: ChainKeys | Chain<ChainKeys>) => {
    asset: Asset<Symbols>;
    origin: Chain<ChainKeys> | MoonChain;
    config: WithdrawConfig<Symbols>;
  };
}

export type AssetsMap<Symbols extends AssetSymbol = AssetSymbol> = Record<
  Symbols,
  Asset<Symbols>
>;

export type ChainsMap<ChainKeys extends ChainKey = ChainKey> = Record<
  ChainKeys,
  Chain<ChainKeys>
>;

export type ChainXcmConfigs<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> = Partial<Record<AssetSymbol, XcmConfig<Symbols, ChainKeys>>>;

export interface XcmConfig<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  asset: Asset<Symbols>;
  origin: Chain<ChainKeys> | MoonChain;
  deposit: Partial<Record<ChainKeys, DepositConfig<Symbols>>>;
  withdraw: Partial<Record<ChainKeys, WithdrawConfig<Symbols>>>;
}

export type ChainTransactConfigs<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> = Partial<Record<ChainKeys, TransactConfig<Symbols, ChainKeys>>>;

export interface TransactConfigBuilder<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chainsFrom: Chain<ChainKeys>[];
  chainsTo: Chain<ChainKeys>[];
  from: (
    keyOrChain: ChainKeys | Chain<ChainKeys>,
  ) => TransactConfigFromBuilder<Symbols, ChainKeys>;
  to: (
    keyOrChain: ChainKeys | Chain<ChainKeys>,
  ) => TransactConfigToBuilder<Symbols, ChainKeys>;
}

export interface TransactConfigFromBuilder<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chain: Chain<ChainKeys>;
  config: TransactFromConfig;
  balance: BalanceConfig<Symbols>;
  getOverallWeight: (txWeight: bigint) => bigint;
  getOverallFee: (overallWeight: bigint) => bigint;
}

export interface TransactConfigToBuilder<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chain: Chain<ChainKeys>;
  config: TransactToConfig;
  balance: BalanceConfig<Symbols>;
  getOverallWeight: (txWeight: bigint) => bigint;
  getOverallFee: (overallWeight: bigint) => bigint;
}

export interface TransactConfig<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  chain: Chain<ChainKeys>;
  unitsPerSecond: bigint;
  balance: BalanceConfig<Symbols>;
  from?: TransactFromConfig;
  to?: TransactToConfig;
}

export interface TransactFromConfig {
  multilocation: {
    account: GetterAccountMultilocationV1;
  };
  transact: XcmTransactThroughSigned;
}

export interface TransactToConfig {
  multilocation: {
    account: GetterAccountMultilocationV1;
  };
  transact: XcmTransactThroughSignedMultilocation;
}
