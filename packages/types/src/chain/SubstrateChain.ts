import { SetOptional } from 'type-fest';
import { Chain, ChainConstructorParams, ChainType } from './Chain';

export interface SubstrateChainConstructorProps
  extends SetOptional<Omit<ChainConstructorParams, 'type'>, 'id'> {
  genesisHash: string;
  parachainId: number;
  ss58Format: number;
}

export class SubstrateChain extends Chain {
  readonly genesisHash: string;

  readonly parachainId: number;

  readonly ss58Format: number;

  constructor({
    genesisHash,
    parachainId,
    ss58Format,
    id,
    ...other
  }: SubstrateChainConstructorProps) {
    super({ ...other, id: id || parachainId, type: ChainType.Substrate });

    this.genesisHash = genesisHash;
    this.parachainId = parachainId;
    this.ss58Format = ss58Format;
  }
}
