import { Parachain, ParachainConstructorParams } from './Parachain';

export interface EvmParachainConstructorProps
  extends ParachainConstructorParams {
  id: number;
  rpc: string;
}

export class EvmParachain extends Parachain {
  readonly id: number;

  readonly rpc: string;

  constructor({ id, rpc, ...others }: EvmParachainConstructorProps) {
    super(others);

    this.id = id;
    this.rpc = rpc;
  }
}
