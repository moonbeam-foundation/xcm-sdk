import { ChainType, Ecosystem } from './Chain.interfaces';
import type { EvmParachain, Parachain } from './parachain';

export interface ChainConstructorParams {
  ecosystem?: Ecosystem;
  isTestChain?: boolean;
  key: string;
  name: string;
  type: ChainType;
  explorer?: string;
  whConfig?: WhConfig;
}

export type WhConfig = {
  isAutomaticPossible: boolean;
  redeemChainId?: number;
  redeemChainName?: string;
  whName: string;
};

export abstract class Chain {
  readonly ecosystem?: Ecosystem;

  readonly isTestChain: boolean;

  readonly key: string;

  readonly name: string;

  readonly type: ChainType;

  readonly explorer?: string;

  readonly whConfig?: WhConfig;

  constructor({
    ecosystem,
    isTestChain = false,
    key,
    name,
    type,
    explorer,
    whConfig,
  }: ChainConstructorParams) {
    this.ecosystem = ecosystem;
    this.isTestChain = isTestChain;
    this.key = key;
    this.name = name;
    this.type = type;
    this.explorer = explorer;
    this.whConfig = whConfig;
  }

  isParachain(): this is Parachain {
    return this.type === ChainType.Parachain;
  }

  isEvmParachain(): this is EvmParachain {
    return this.type === ChainType.EvmParachain;
  }
}
