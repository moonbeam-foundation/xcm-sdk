import { SetOptional } from '../../common.interfaces';
import { Chain, ChainConstructorParams } from '../Chain';
import { ChainType } from '../Chain.interfaces';

export interface ParachainConstructorParams
  extends SetOptional<ChainConstructorParams, 'type'> {
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

  constructor({
    assets,
    genesisHash,
    parachainId,
    usesChainDecimals,
    ss58Format,
    weight,
    ws,
    type = ChainType.Parachain,
    ...others
  }: ParachainConstructorParams) {
    super({ type, ...others });

    this.genesisHash = genesisHash;
    this.parachainId = parachainId;
    this.ss58Format = ss58Format;
    this.usesChainDecimals = !!usesChainDecimals;
    this.weight = weight;
    this.ws = ws;
  }
}
