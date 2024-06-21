import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { AnyChain } from '@moonbeam-network/xcm-types';
import {
  BalanceContractInterface,
  TransferContractInterface,
} from './contract.interfaces';
import { Erc20, Xtokens } from './contracts';

export function createContract(
  chain: AnyChain,
  config: ContractConfig,
): TransferContractInterface | BalanceContractInterface {
  if (!chain.isEvmParachain()) {
    throw new Error('Chain is not an EVM parachain');
  }

  if (config.module === 'Erc20') {
    return new Erc20(config, chain);
  }

  if (config.module === 'Xtokens') {
    const address =
      'contracts' in chain ? chain?.contracts?.Xtokens : undefined;

    return new Xtokens(config, chain, address);
  }

  throw new Error(`Contract ${config.module} not found`);
}
