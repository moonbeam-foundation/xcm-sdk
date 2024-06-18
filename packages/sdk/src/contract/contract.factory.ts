import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { AnyChain } from '@moonbeam-network/xcm-types';
import { EvmSigner } from '../sdk.interfaces';
import {
  BalanceContractInterface,
  TransferContractInterface,
} from './contract.interfaces';
import { Erc20, Xtokens } from './contracts';

export function createContract(
  chain: AnyChain,
  config: ContractConfig,
  signer?: EvmSigner,
): TransferContractInterface | BalanceContractInterface {
  if (config.module === 'Erc20' && chain.isEvmParachain()) {
    return new Erc20(config, chain);
  }

  if (config.module === 'Xtokens') {
    if (!signer) {
      throw new Error('Signer is required for Xtokens contract');
    }

    const address =
      'contracts' in chain ? chain?.contracts?.Xtokens : undefined;

    return new Xtokens(config, signer, address);
  }

  throw new Error(`Contract ${config.module} not found`);
}
