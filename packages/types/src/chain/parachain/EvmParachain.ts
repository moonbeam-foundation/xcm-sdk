import { ChainType } from '../Chain.interfaces';
import { Parachain, ParachainConstructorParams } from './Parachain';

export interface EvmParachainConstructorParams
  extends Omit<ParachainConstructorParams, 'type'> {
  id: number;
  rpc: string;
}

export class EvmParachain extends Parachain {
  readonly id: number;

  readonly rpc: string;

  constructor({ id, rpc, ...others }: EvmParachainConstructorParams) {
    super({ type: ChainType.EvmParachain, ...others });

    this.id = id;
    this.rpc = rpc;
  }
}
