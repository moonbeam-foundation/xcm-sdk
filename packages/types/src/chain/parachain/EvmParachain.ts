import { Address, defineChain } from 'viem';
import { Chain } from 'viem/chains';
import { ChainType } from '../Chain.interfaces';
import { Parachain, ParachainConstructorParams } from './Parachain';

export interface EvmParachainConstructorParams
  extends Omit<ParachainConstructorParams, 'type'> {
  id: number;
  rpc: string;
  isEvmSigner?: boolean;
  contracts?: Contracts;
}

type Contracts = {
  Xtokens?: Address;
};

export class EvmParachain extends Parachain {
  readonly id: number;

  readonly rpc: string;

  readonly isEvmSigner: boolean;

  readonly contracts?: Contracts;

  constructor({
    id,
    rpc,
    isEvmSigner = false,
    contracts,
    ...others
  }: EvmParachainConstructorParams) {
    super({ type: ChainType.EvmParachain, ...others });

    this.contracts = contracts;
    this.id = id;
    this.rpc = rpc;
    this.isEvmSigner = isEvmSigner;
  }

  getViemChain(): Chain {
    return defineChain({
      id: this.id,
      name: this.name,
      nativeCurrency: {
        decimals: this.nativeAsset.decimals,
        name: this.nativeAsset.originSymbol,
        symbol: this.nativeAsset.originSymbol,
      },
      rpcUrls: {
        default: {
          http: [this.rpc],
          webSocket: Array.isArray(this.ws) ? this.ws : [this.ws],
        },
      },
    });
  }
}
