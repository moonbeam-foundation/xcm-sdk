import {
  BalanceConfigBuilder,
  CallType,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import { AssetRoute } from '@moonbeam-network/xcm-config';
import {
  AnyParachain,
  AssetAmount,
  ChainAsset,
} from '@moonbeam-network/xcm-types';
import { convertDecimals } from '@moonbeam-network/xcm-utils';
import { BalanceContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';

export interface GetBalancesParams {
  address: string;
  asset: ChainAsset;
  builder: BalanceConfigBuilder;
  chain: AnyParachain;
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

export async function getMin(
  route: AssetRoute,
  polkadot: PolkadotService,
): Promise<AssetAmount> {
  const asset = AssetAmount.fromChainAsset(
    polkadot.chain.getChainAsset(route.asset),
    { amount: 0n },
  );

  if (route.source.min) {
    const min = await polkadot.query(
      route.source.min.build({ asset: asset.getMinAssetId() }),
    );

    return asset.copyWith({ amount: min });
  }

  if (asset.min) {
    return asset.copyWith({ amount: asset.min });
  }

  return asset.copyWith({ amount: 0n });
}
