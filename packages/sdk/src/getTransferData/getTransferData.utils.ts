import {
  CallType,
  ContractConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '@moonbeam-network/xcm-config';
import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import { convertDecimals } from '@moonbeam-network/xcm-utils';
import { BalanceContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';

export interface GetBalancesParams {
  address: string;
  chain: AnyChain;
  config: AssetConfig;
  polkadot: PolkadotService;
}

export type GetDecimalsParams = Omit<GetBalancesParams, 'decimals'> & {
  assetBuiltConfig?: SubstrateQueryConfig | ContractConfig;
};

export async function getBalance({
  address,
  chain,
  config,
  polkadot,
}: GetBalancesParams): Promise<AssetAmount> {
  const asset = chain.getChainAsset(config.asset);
  const cfg = config.balance.build({
    address,
    asset: asset.getBalanceAssetId(),
  });

  if (cfg.type === CallType.Substrate) {
    const balance = await polkadot.query(cfg as SubstrateQueryConfig);
    const converted = chain.usesChainDecimals
      ? convertDecimals(balance, polkadot.decimals, asset.decimals)
      : balance;

    return asset.toAssetAmount({ amount: converted });
  }

  const contract = createContract(chain, cfg) as BalanceContractInterface;
  const balance = await contract.getBalance();

  return asset.toAssetAmount({ amount: balance });
}

export async function getMin(config: AssetConfig, polkadot: PolkadotService) {
  const asset = polkadot.chain.getChainAsset(config.asset);

  if (config.min) {
    return polkadot.query(config.min.build({ asset: asset.getMinAssetId() }));
  }

  if (asset.min) {
    return asset.toAssetAmount({ amount: asset.min });
  }

  return 0n;
}
