import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { AnyParachain, EvmParachain } from '@moonbeam-network/xcm-types';
import {
  BalanceContractInterface,
  TransferContractInterface,
} from './contract.interfaces';
import { Erc20, Xtokens } from './contracts';

export function createContract(
  chain: AnyParachain,
  config: ContractConfig,
): TransferContractInterface | BalanceContractInterface {
  if (!EvmParachain.is(chain)) {
    throw new Error('Chain is not an EvmParachain');
  }

  if (config.module === 'Erc20') {
    return new Erc20(config, chain);
  }

  if (config.module === 'Xtokens') {
    const address = chain?.contracts?.Xtokens;

    return new Xtokens(config, chain, address);
  }

  throw new Error(`Contract ${config.module} not found`);
}
