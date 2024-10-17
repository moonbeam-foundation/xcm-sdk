import { Chain, type ChainConstructorParams } from '../Chain';

export interface ParachainConstructorParams extends ChainConstructorParams {
  checkSovereignAccountBalances?: boolean;
  genesisHash: string;
  isRelay?: boolean;
  parachainId: number;
  ss58Format: number;
  usesChainDecimals?: boolean;
  weight?: number;
  ws: string[];
}

export class Parachain extends Chain {
  readonly checkSovereignAccountBalances: boolean;

  readonly genesisHash: string;

  readonly isRelay: boolean;

  readonly parachainId: number;

  readonly ss58Format: number;

  readonly usesChainDecimals: boolean;

  readonly weight: number | undefined;

  readonly ws: string[];

  static is(obj: unknown): obj is Parachain {
    return obj instanceof Parachain;
  }

  constructor({
    checkSovereignAccountBalances,
    genesisHash,
    isRelay,
    parachainId,
    usesChainDecimals,
    ss58Format,
    weight,
    ws,
    ...others
  }: ParachainConstructorParams) {
    super(others);

    this.checkSovereignAccountBalances = !!checkSovereignAccountBalances;
    this.genesisHash = genesisHash;
    this.isRelay = !!isRelay;
    this.parachainId = parachainId;
    this.ss58Format = ss58Format;
    this.usesChainDecimals = !!usesChainDecimals;
    this.weight = weight;
    this.ws = ws;
  }
}
