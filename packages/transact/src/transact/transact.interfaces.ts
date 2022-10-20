import type { Chain, ChainKey, MoonChain } from '@moonbeam-network/xcm-config';
import type {
  ExtrinsicEventsCallback,
  Hash,
} from '@moonbeam-network/xcm-utils';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import type { IKeyringPair } from '@polkadot/types/types';
import type { Signer as EthersSigner } from 'ethers';

export interface Transactor<ChainKeys extends ChainKey = ChainKey> {
  moonChain: MoonChain;
  chainsFrom: Chain<ChainKeys>[];
  chainsTo: Chain<ChainKeys>[];
  from: (keyOrChain: ChainKeys | Chain<ChainKeys>) => TransactorFrom<ChainKeys>;
  to: (keyOrChain: ChainKeys | Chain<ChainKeys>) => TransactorTo<ChainKeys>;
}

export interface TransactorFrom<ChainKeys extends ChainKey = ChainKey> {
  transact: (
    callHash: string,
    sourceAccount: string | IKeyringPair,
    polkadotSigner?: PolkadotSigner,
  ) => Promise<TransactFromData<ChainKeys>>;
}

export interface TransactorTo<ChainKeys extends ChainKey = ChainKey> {
  transact: (
    callHash: string,
    ethersSigner?: EthersSigner,
  ) => Promise<TransactToData<ChainKeys>>;
}

export interface TransactFromData<ChainKeys extends ChainKey = ChainKey> {
  overallFee: bigint;
  overallWeight: bigint;
  txWeight: bigint;
  source: {
    chain: Chain<ChainKeys>;
    address: string;
  };
  target: {
    chain: MoonChain;
    address20: string;
    address32: string;
  };
  send: (cb?: ExtrinsicEventsCallback) => Promise<Hash>;
}

export interface TransactToData<ChainKeys extends ChainKey = ChainKey> {
  overallFee: bigint;
  overallWeight: bigint;
  txWeight: bigint;
  source: {
    chain: MoonChain;
    address: string;
  };
  target: {
    chain: Chain<ChainKeys>;
    address20: string;
    address32: string;
  };
  send: (cb?: ExtrinsicEventsCallback) => Promise<Hash>;
}
