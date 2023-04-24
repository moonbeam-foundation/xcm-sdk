import { Chain, ChainConstructorParams, ChainType } from './Chain';

export interface EthereumChainConstructorProps
  extends Omit<ChainConstructorParams, 'type'> {}

export class EthereumChain extends Chain {
  constructor(params: EthereumChainConstructorProps) {
    super({ ...params, type: ChainType.Ethereum });
  }
}
