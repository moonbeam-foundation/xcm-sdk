import type { Address } from 'viem';
import type { Chain } from 'viem/chains';
import { getViemChain } from '../Chain.utils';
import { EvmChain } from '../EvmChain';
import { Parachain, type ParachainConstructorParams } from './Parachain';

export interface EvmParachainConstructorParams
  extends ParachainConstructorParams {
  isEvmSigner?: boolean;
  contracts?: Contracts;
}

type EvmParachainConstructorParamsForEvmSigner =
  EvmParachainConstructorParams & {
    id: number;
    rpc: string;
  };

type EvmParachainConstructorParamsForNonEvmSigner = Omit<
  EvmParachainConstructorParams,
  'id' | 'rpc'
>;

export type EvmParachainConstructorParamsConditional =
  | (EvmParachainConstructorParamsForEvmSigner & { isEvmSigner: true })
  | (EvmParachainConstructorParamsForNonEvmSigner & { isEvmSigner?: false });

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

  constructor(params: EvmParachainConstructorParamsConditional) {
    super(params);

    this.contracts = params.contracts;
    this.id = 'id' in params ? params.id : 0;
    this.rpc = 'rpc' in params ? params.rpc : '';
    this.isEvmSigner = params.isEvmSigner ?? false;
  }

  getViemChain(): Chain {
    return getViemChain(this);
  }
}
