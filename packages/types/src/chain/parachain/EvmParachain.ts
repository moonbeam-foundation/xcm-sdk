import { defineChain } from 'viem';
import { Chain } from 'viem/chains';
import { ChainType } from '../Chain.interfaces';
import { Parachain, ParachainConstructorParams } from './Parachain';

export interface EvmParachainConstructorParams
  extends Omit<ParachainConstructorParams, 'type'> {
  id: number;
  rpc: string;
  nativeCurrency: NativeCurrency;
}

type NativeCurrency = {
  decimals: number;
  name: string;
  symbol: string;
};

export class EvmParachain extends Parachain {
  readonly id: number;

  readonly rpc: string;

  readonly nativeCurrency: NativeCurrency;

  constructor({
    id,
    rpc,
    nativeCurrency,
    ...others
  }: EvmParachainConstructorParams) {
    super({ type: ChainType.EvmParachain, ...others });

    this.id = id;
    this.rpc = rpc;
    this.nativeCurrency = nativeCurrency;
  }

  getViemChain(): Chain {
    return defineChain({
      id: this.id,
      name: this.name,
      nativeCurrency: this.nativeCurrency,
      rpcUrls: {
        default: {
          http: [this.rpc],
          webSocket: [this.ws],
        },
      },
    });
  }
}
