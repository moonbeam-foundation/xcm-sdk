import type { Chain as ViemChain } from 'viem';
import { Chain, type ChainConstructorParams } from './Chain';
import { getViemChain } from './Chain.utils';

export interface EvmChainConstructorParams extends ChainConstructorParams {
  id: number;
  rpc: string;
}

export class EvmChain extends Chain {
  readonly id: number;

  rpc: string;

  static is(obj: unknown): obj is EvmChain {
    return obj instanceof EvmChain;
  }

  constructor({ id, rpc, ...others }: EvmChainConstructorParams) {
    super(others);

    this.id = id;
    this.rpc = rpc;
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
