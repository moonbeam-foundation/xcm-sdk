import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { EvmSigner } from '../sdk.interfaces';
import {
  BalanceContractInterface,
  TransferContractInterface,
} from './contract.interfaces';
import { Erc20, Xtokens } from './contracts';

export function createContract(
  config: ContractConfig,
  signer: EvmSigner,
): TransferContractInterface | BalanceContractInterface {
  if (config.module === 'Erc20') {
    return new Erc20(config, signer);
  }

  if (config.module === 'Xtokens') {
    return new Xtokens(config, signer);
  }

  throw new Error(`Contract ${config.module} not found`);
}
