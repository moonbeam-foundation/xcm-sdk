import type {
  AssetSymbol,
  Chain,
  ChainKey,
  MoonChain,
} from '@moonbeam-network/xcm-config';
import type {
  ExtrinsicEventsCallback,
  Hash,
} from '@moonbeam-network/xcm-utils';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import type { IKeyringPair } from '@polkadot/types/types';
import type { Signer as EthersSigner } from 'ethers';

export interface Transactor<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  moonChain: MoonChain;
  chainsFrom: Chain<ChainKeys>[];
  chainsTo: Chain<ChainKeys>[];
  from: (
    keyOrChain: ChainKeys | Chain<ChainKeys>,
  ) => TransactorFrom<Symbols, ChainKeys>;
  to: (
    keyOrChain: ChainKeys | Chain<ChainKeys>,
  ) => TransactorTo<Symbols, ChainKeys>;
}

export interface TransactorFrom<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  transact: (
    callHash: string,
    sourceAccount: string | IKeyringPair,
    polkadotSigner?: PolkadotSigner,
  ) => Promise<TransactFromData<Symbols, ChainKeys>>;
}

export interface TransactorTo<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  transact: (
    callHash: string,
    ethersSigner?: EthersSigner,
  ) => Promise<TransactToData<Symbols, ChainKeys>>;
}

export interface TransactFromData<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  overallFee: bigint;
  overallWeight: bigint;
  txWeight: bigint;
  source: {
    address: string;
    balance: Balance<Symbols>;
    chain: Chain<ChainKeys>;
  };
  destination: {
    address: string;
    address32: string;
    balance: Balance<Symbols>;
    chain: MoonChain;
  };
  send: (cb?: ExtrinsicEventsCallback) => Promise<Hash>;
}

export interface TransactToData<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  overallFee: bigint;
  overallWeight: bigint;
  txWeight: bigint;
  source: {
    address: string;
    balance: Balance<Symbols>;
    chain: MoonChain;
  };
  destination: {
    balance: Balance<Symbols>;
    chain: Chain<ChainKeys>;
    address: string;
    address32: string;
  };
  send: (cb?: ExtrinsicEventsCallback) => Promise<Hash>;
}

export interface Balance<Symbols extends AssetSymbol = AssetSymbol> {
  balance: bigint;
  decimals: number;
  symbol: Symbols;
}
