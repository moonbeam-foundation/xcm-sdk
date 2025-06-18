import { Chain, type ChainConstructorParams } from '../Chain';

export interface ParachainConstructorParams extends ChainConstructorParams {
  checkSovereignAccountBalances?: boolean;
  genesisHash: string;
  isRelay?: boolean;
  parachainId: number;
  relayGenesisHash?: string;
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

  readonly relayGenesisHash?: string;

  readonly weight: number | undefined;

  ws: string[];

  static is(obj: unknown): obj is Parachain {
    return obj instanceof Parachain;
  }

  constructor({
    checkSovereignAccountBalances,
    genesisHash,
    isRelay,
    parachainId,
    relayGenesisHash,
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
    this.relayGenesisHash = relayGenesisHash;
    this.ss58Format = ss58Format;
    this.usesChainDecimals = !!usesChainDecimals;
    this.weight = weight;
    this.ws = ws;
  }

  setWs(ws: string[]): void {
    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ Parachain.ts:64 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* ws = ');
    console.log(ws);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );
    this.ws = ws;
  }
}
