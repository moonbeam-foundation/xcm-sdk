import { Ecosystem } from './Chain.interfaces';
import type { EvmParachain, Parachain } from './parachain';

export interface ChainConstructorParams {
  ecosystem?: Ecosystem;
  isTestChain?: boolean;
  key: string;
  name: string;
}

export abstract class Chain {
  readonly ecosystem?: Ecosystem;

  readonly isTestChain: boolean;

  readonly key: string;

  readonly name: string;

  constructor({
    ecosystem,
    isTestChain = false,
    key,
    name,
  }: ChainConstructorParams) {
    this.ecosystem = ecosystem;
    this.isTestChain = isTestChain;
    this.key = key;
    this.name = name;
  }

  isParachain(): this is Parachain {
    return this.constructor.name === 'Parachain';
  }

  isEvmParachain(): this is EvmParachain {
    return this.constructor.name === 'EvmParachain';
  }
}
