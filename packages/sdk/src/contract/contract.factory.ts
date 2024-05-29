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
  chain: EvmParachain,
  signer: EvmSigner,
): TransferContractInterface | BalanceContractInterface {
  if (config.module === 'Erc20') {
    return new Erc20(config, signer);
  }

  console.log(
    '\x1b[34m████████████████████▓▓▒▒░ contract.factory.ts:20 ░▒▒▓▓████████████████████\x1b[0m',
  );
  console.log('* config.module = ');
  console.log(config.module);
  console.log(
    '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
  );

  console.log(
    '\x1b[34m████████████████████▓▓▒▒░ contract.factory.ts:29 ░▒▒▓▓████████████████████\x1b[0m',
  );
  console.log('* chain = ');
  console.log(chain);
  console.log(
    '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
  );

  if (config.module === 'Xtokens') {
    const address = chain?.contracts?.Xtokens;

    return new Xtokens(config, signer, address);
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
    ? createContractWithSigner(config, chain, signer)
    : createContractWithoutSigner(config, chain as EvmParachain);
}
