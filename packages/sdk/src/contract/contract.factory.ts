import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Signer } from 'ethers';
import { ContractInterface } from './contract.interfaces';
import { Xtokens } from './contracts/Xtokens';

export function createContract(
  config: ContractConfig,
  signer: Signer,
): ContractInterface {
  if (config.module === 'Xtokens') {
    return new Xtokens(config, signer);
  }

  throw new Error(`Contract ${config.module} not found`);
}
