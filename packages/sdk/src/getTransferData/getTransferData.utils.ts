import {
  CallType,
  ContractConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '@moonbeam-network/xcm-config';
import { AnyChain, Asset, EvmParachain } from '@moonbeam-network/xcm-types';
import { convertDecimals, toBigInt } from '@moonbeam-network/xcm-utils';
import {
  BalanceContractInterface,
  createContractWithoutSigner,
} from '../contract';
import { PolkadotService } from '../polkadot';

export interface GetBalancesParams {
  address: string;
  asset?: Asset;
  chain: AnyChain;
  config: AssetConfig;
  decimals: number;
  polkadot: PolkadotService;
}

export type GetDecimalsParams = Omit<GetBalancesParams, 'decimals'> & {
  assetBuiltConfig?: SubstrateQueryConfig | ContractConfig;
};

export async function getBalance({
  address,
  chain,
  config,
  decimals,
  polkadot,
}: GetBalancesParams) {
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

  const contract = createContractWithoutSigner(
    cfg,
    chain as EvmParachain,
  ) as BalanceContractInterface;

  const balance = await contract.getBalance();

  return balance;
}

export async function getDecimals({
  address,
  asset,
  config,
  polkadot,
  chain,
  assetBuiltConfig,
}: GetDecimalsParams) {
  const cfg =
    assetBuiltConfig ||
    config.balance.build({
      address,
      asset: polkadot.chain.getBalanceAssetId(asset || config.asset),
    });

  if (cfg.type === CallType.Substrate) {
    return polkadot.getAssetDecimals(asset || config.asset);
  }

  const contract = createContractWithoutSigner(
    cfg,
    chain as EvmParachain,
  ) as BalanceContractInterface;

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
