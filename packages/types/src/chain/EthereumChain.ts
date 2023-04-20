import { Chain, ChainConstructorProps, ChainType } from './Chain';

export interface EthereumChainConstructorProps
  extends Omit<ChainConstructorProps, 'type' | 'decimals'> {}

export class EthereumChain extends Chain {
  readonly decimals: number;

  constructor(params: EthereumChainConstructorProps) {
    super({ ...params, type: ChainType.Ethereum });

    this.decimals = 18;
  }
}
