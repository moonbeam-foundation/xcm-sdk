import { EthereumChain } from './EthereumChain';
import { SubstrateChain } from './SubstrateChain';

export enum ChainType {
  Ethereum = 'Ethereum',
  Substrate = 'Substrate',
}

export interface ChainConstructorProps {
  decimals?: number;
  genesisHash?: string;
  id: string | number;
  isTestChain?: boolean;
  key: string;
  name: string;
  parachainId?: number;
  type: ChainType;
  ws: string;
}

export abstract class Chain {
  decimals?: number;

  readonly genesisHash?: string;

  readonly id: string | number;

  readonly isTestChain: boolean;

  readonly key: string;

  readonly name: string;

  readonly parachainId?: number;

  readonly type: ChainType;

  readonly ws: string;

  constructor({
    decimals,
    genesisHash,
    id,
    isTestChain = false,
    key,
    name,
    parachainId,
    type,
    ws,
  }: ChainConstructorProps) {
    this.decimals = decimals;
    this.genesisHash = genesisHash;
    this.id = id;
    this.isTestChain = isTestChain;
    this.key = key;
    this.name = name;
    this.parachainId = parachainId;
    this.type = type;
    this.ws = ws;
  }

  isEthereumChain(): this is EthereumChain {
    return this instanceof EthereumChain;
  }

  isSubstrateChain(): this is SubstrateChain {
    return this instanceof SubstrateChain;
  }
}
