import { Parachain, ParachainConstructorParams } from './Parachain';

export interface EvmParachainConstructorParams
  extends ParachainConstructorParams {
  id: number;
  rpc: string;
}

export class EvmParachain extends Parachain {
  readonly id: number;

  readonly rpc: string;

  constructor({ id, rpc, ...others }: EvmParachainConstructorParams) {
    super(others);

    this.id = id;
    this.rpc = rpc;
  }
}
