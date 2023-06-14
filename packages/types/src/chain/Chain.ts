import { ChainType, Ecosystem } from './Chain.interfaces';
import type { EvmParachain, Parachain } from './parachain';

export interface ChainConstructorParams {
  ecosystem?: Ecosystem;
  isTestChain?: boolean;
  key: string;
  name: string;
  type: ChainType;
}

export abstract class Chain {
  readonly ecosystem?: Ecosystem;

  readonly isTestChain: boolean;

  readonly key: string;

  readonly name: string;

  readonly type: ChainType;

  constructor({
    ecosystem,
    isTestChain = false,
    key,
    name,
    type,
  }: ChainConstructorParams) {
    this.ecosystem = ecosystem;
    this.isTestChain = isTestChain;
    this.key = key;
    this.name = name;
    this.type = type;
  }

  isParachain(): this is Parachain {
    return this.type === ChainType.Parachain;
  }

  isEvmParachain(): this is EvmParachain {
    return this.type === ChainType.EvmParachain;
  }
}
