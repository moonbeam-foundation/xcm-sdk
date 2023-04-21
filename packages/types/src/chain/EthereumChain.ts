import { Chain, ChainConstructorProps, ChainType } from './Chain';

export interface EthereumChainConstructorProps
  extends Omit<ChainConstructorProps, 'type'> {}

export class EthereumChain extends Chain {
  constructor(params: EthereumChainConstructorProps) {
    super({ ...params, type: ChainType.Ethereum });
  }
}
