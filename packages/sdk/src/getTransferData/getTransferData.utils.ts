import { CallType, SubstrateQueryConfig } from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '@moonbeam-network/xcm-config';
import { AnyChain, Asset } from '@moonbeam-network/xcm-types';
import { convertDecimals, toBigInt } from '@moonbeam-network/xcm-utils';
import { BalanceContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';
import { EvmSigner } from '../sdk.interfaces';

export interface GetBalancesParams {
  address: string;
  asset?: Asset;
  chain: AnyChain;
  config: AssetConfig;
  decimals: number;
  evmSigner?: EvmSigner;
  polkadot: PolkadotService;
}

export type GetDecimalsParams = Omit<GetBalancesParams, 'decimals'>;

export async function getBalance(params: GetBalancesParams) {
  const { address, chain, config, decimals, evmSigner, polkadot } = params;

  //  address: "5CezZTdwzytCEAxMvXbXkxf9cxErweUWfGUH9aTHnZsmSyrG" my wallet
  // chain is the chain object Polkadot or HydraDX from sdk
  // polkadot is ApiPROvider polkadot

  // pirnt  config object class name

  // console.log(
  //   '\x1b[34m████████████████████▓▓▒▒░ getTransferData.utils.ts:24 ░▒▒▓▓████████████████████\x1b[0m',
  // );
  // console.log('* params = ');
  // console.log(params);
  // console.log(
  //   '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
  // );

  const cfg = config.balance.build({
    address,
    asset: polkadot.chain.getBalanceAssetId(config.asset),
  });

  if (cfg.type === CallType.Substrate) {
    const balance = await polkadot.query(cfg as SubstrateQueryConfig);
    return chain.usesChainDecimals
      ? convertDecimals(balance, polkadot.decimals, decimals)
      : balance;
  }

  if (!evmSigner) {
    throw new Error('Evm signer must be provided');
  }

  const contract = createContract(cfg, evmSigner) as BalanceContractInterface;

  return contract.getBalance();
}

export async function getDecimals({
  address,
  asset,
  config,
  evmSigner,
  polkadot,
}: GetDecimalsParams) {
  const cfg = config.balance.build({
    address,
    asset: polkadot.chain.getBalanceAssetId(asset || config.asset),
  });

  if (cfg.type === CallType.Substrate) {
    return polkadot.getAssetDecimals(asset || config.asset);
  }

  if (!evmSigner) {
    throw new Error('Evm signer must be provided');
  }

  const contract = createContract(cfg, evmSigner) as BalanceContractInterface;

  return contract.getDecimals();
}

export async function getMin(config: AssetConfig, polkadot: PolkadotService) {
  if (config.min) {
    return polkadot.query(
      config.min.build({ asset: polkadot.chain.getMinAssetId(config.asset) }),
    );
  }

  const min = polkadot.chain.getAssetMin(config.asset);

  if (min) {
    const decimals = await polkadot.getAssetDecimals(config.asset);

    return toBigInt(min, decimals);
  }

  return 0n;
}
