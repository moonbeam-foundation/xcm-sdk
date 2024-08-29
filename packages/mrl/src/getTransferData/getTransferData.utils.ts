import { AnyChain, AssetAmount, ChainAsset } from '@moonbeam-network/xcm-types';
import { BalanceConfigBuilder } from '../../../builder';

export interface GetBalancesParams {
  address: string;
  asset: ChainAsset;
  builder: BalanceConfigBuilder;
  chain: AnyChain;
}

export async function getBalance({
  address,
  asset,
  builder,
  chain,
}: GetBalancesParams): Promise<AssetAmount> {
  const cfg = builder.build({
    address,
    asset: asset.getBalanceAssetId(),
    contractAddress: asset.address,
  });
  const amount = AssetAmount.fromChainAsset(asset, { amount: 0n });

  if (cfg.type === CallType.Substrate) {
    const balance = await polkadot.query(cfg as SubstrateQueryConfig);
    const converted = chain.usesChainDecimals
      ? convertDecimals(balance, polkadot.decimals, asset.decimals)
      : balance;

    return amount.copyWith({ amount: converted });
  }

  const contract = createContract(chain, cfg) as BalanceContractInterface;
  const balance = await contract.getBalance();

  return amount.copyWith({ amount: balance });
}
