import {
  BalanceConfigBuilder,
  CallType,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '@moonbeam-network/xcm-config';
import { AnyChain, AssetAmount, ChainAsset } from '@moonbeam-network/xcm-types';
import { convertDecimals } from '@moonbeam-network/xcm-utils';
import { BalanceContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';

export interface GetBalancesParams {
  address: string;
  asset: ChainAsset;
  builder: BalanceConfigBuilder;
  chain: AnyChain;
  polkadot: PolkadotService;
}

export async function getBalance({
  address,
  asset,
  builder,
  chain,
  polkadot,
}: GetBalancesParams): Promise<AssetAmount> {
  const cfg = builder.build({
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

export async function getMin(
  config: AssetConfig,
  polkadot: PolkadotService,
): Promise<AssetAmount> {
  const asset = polkadot.chain.getChainAsset(config.asset);

  if (config.min) {
    const min = await polkadot.query(
      config.min.build({ asset: asset.getMinAssetId() }),
    );

    return asset.toAssetAmount({ amount: min });
  }

  if (asset.min) {
    return asset.toAssetAmount({ amount: asset.min });
  }

  return asset.toAssetAmount({ amount: 0n });
}
