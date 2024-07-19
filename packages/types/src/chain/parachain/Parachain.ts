import { Chain, ChainConstructorParams } from '../Chain';

export interface ParachainConstructorParams extends ChainConstructorParams {
  genesisHash: string;
  parachainId: number;
  ss58Format: number;
  usesChainDecimals?: boolean;
  weight?: number;
  ws: string | string[];
}

export class Parachain extends Chain {
  readonly genesisHash: string;

  readonly parachainId: number;

  readonly ss58Format: number;

  readonly usesChainDecimals: boolean;

  readonly weight: number | undefined;

  readonly ws: string | string[];

  static is(obj: unknown): obj is Parachain {
    return obj instanceof Parachain;
  }

  constructor({
    genesisHash,
    parachainId,
    usesChainDecimals,
    ss58Format,
    weight,
    ws,
    ...others
  }: ParachainConstructorParams) {
    super(others);

    this.genesisHash = genesisHash;
    this.parachainId = parachainId;
    this.ss58Format = ss58Format;
    this.usesChainDecimals = !!usesChainDecimals;
    this.weight = weight;
    this.ws = ws;
  }
}
