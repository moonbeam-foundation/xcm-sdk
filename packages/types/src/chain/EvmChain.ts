import type { Address, Chain as ViemChain } from 'viem';
import { Chain, type ChainConstructorParams } from './Chain';
import { getViemChain } from './Chain.utils';

export interface EvmChainConstructorParams extends ChainConstructorParams {
  id: number;
  rpc: string;
  contracts?: Contracts;
}

type Contracts = {
  Gateway?: Address;
};

export class EvmChain extends Chain {
  readonly id: number;

  readonly rpc: string;

  readonly contracts?: Contracts;

  static is(obj: unknown): obj is EvmChain {
    return obj instanceof EvmChain;
  }

  constructor({ id, rpc, contracts, ...others }: EvmChainConstructorParams) {
    super(others);

    this.id = id;
    this.rpc = rpc;
    this.contracts = contracts;
  }

  getViemChain(): ViemChain {
    return getViemChain(this);
  }

  copyWith(params: Partial<EvmChainConstructorParams>): EvmChain {
    return new EvmChain({
      ...this,
      ...params,
    });
  }
}
