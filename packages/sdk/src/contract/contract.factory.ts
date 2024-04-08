import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { AnyChain, EvmParachain } from '@moonbeam-network/xcm-types';
import { EvmSigner } from '../sdk.interfaces';
import {
  BalanceContractInterface,
  TransferContractInterface,
} from './contract.interfaces';
import { Erc20, Xtokens } from './contracts';
import { Erc20Public } from './contracts/Erc20/Erc20Public';

export function createContractWithSigner(
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

export function createContractWithoutSigner(
  config: ContractConfig,
  chain: EvmParachain,
): TransferContractInterface | BalanceContractInterface {
  if (config.module === 'Erc20') {
    return new Erc20Public(config, chain.getViemChain());
  }

  throw new Error(`Public Contract ${config.module} not found`);
}

export function createContract(
  config: ContractConfig,
  signer: EvmSigner | undefined,
  chain?: AnyChain,
): TransferContractInterface | BalanceContractInterface {
  return signer
    ? createContractWithSigner(config, signer)
    : createContractWithoutSigner(config, chain as EvmParachain);
}
