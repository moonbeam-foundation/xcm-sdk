import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Signer } from 'ethers';
import {
  BalanceContractInterface,
  TransferContractInterface,
} from './contract.interfaces';
import { Erc20, Xtokens } from './contracts';

export function createContract(
  config: ContractConfig,
  signer?: Signer,
): TransferContractInterface | BalanceContractInterface {
  if (config.module === 'Erc20') {
    return new Erc20(config);
  }

  if (!signer) {
    throw new Error('Signer is required for transfer contracts');
  }

  if (config.module === 'Xtokens') {
    return new Xtokens(config, signer);
  }

  throw new Error(`Contract ${config.module} not found`);
}
