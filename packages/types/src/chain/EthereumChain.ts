import { Chain, ChainConstructorParams, ChainType } from './Chain';

export interface EthereumChainConstructorParams
  extends Omit<ChainConstructorParams, 'type' | 'decimals'> {}

export class EthereumChain extends Chain {
  readonly decimals: number;

  constructor(params: EthereumChainConstructorParams) {
    super({ ...params, type: ChainType.Ethereum });

    this.decimals = 18;
  }
}
