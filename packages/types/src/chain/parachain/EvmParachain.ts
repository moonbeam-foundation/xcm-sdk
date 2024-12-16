import type { Address } from 'viem';
import type { Chain } from 'viem/chains';
import { getViemChain } from '../Chain.utils';
import { EvmChain } from '../EvmChain';
import { Parachain, type ParachainConstructorParams } from './Parachain';

export interface EvmParachainConstructorParams
  extends ParachainConstructorParams {
  id: number;
  rpc: string;
  isEvmSigner?: boolean;
  contracts?: Contracts;
}

type Contracts = {
  Batch?: Address;
  XcmUtils?: Address;
  Xtokens?: Address;
};

export class EvmParachain extends Parachain {
  readonly id: number;

  readonly rpc: string;

  readonly isEvmSigner: boolean;

  readonly contracts?: Contracts;

  static is(obj: unknown): obj is EvmParachain {
    return obj instanceof EvmParachain;
  }

  static isAnyParachain(obj: unknown): obj is EvmParachain | Parachain {
    return obj instanceof EvmParachain || obj instanceof Parachain;
  }

  static isAnyEvmChain(obj: unknown): obj is EvmParachain | EvmChain {
    return obj instanceof EvmParachain || obj instanceof EvmChain;
  }

  constructor({
    id,
    rpc,
    isEvmSigner = false,
    contracts,
    ...others
  }: EvmParachainConstructorParams) {
    super(others);

    this.contracts = contracts;
    this.id = id;
    this.rpc = rpc;
    this.isEvmSigner = isEvmSigner;
  }

  getViemChain(): Chain {
    return getViemChain(this);
  }
}
