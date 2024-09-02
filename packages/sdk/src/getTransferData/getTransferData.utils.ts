import {
  AssetMinConfigBuilder,
  BalanceConfigBuilder,
  FeeConfigBuilder,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import {
  AnyChain,
  Asset,
  AssetAmount,
  ChainAsset,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import { convertDecimals } from '@moonbeam-network/xcm-utils';
import { BalanceContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';

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
  const config = builder.build({
    address,
    asset: asset.getBalanceAssetId(),
    contractAddress: asset.address,
  });
  const amount = AssetAmount.fromChainAsset(asset, { amount: 0n });

  if (
    SubstrateQueryConfig.is(config) &&
    (Parachain.is(chain) || EvmParachain.is(chain))
  ) {
    const polkadot = await PolkadotService.create(chain);
    const balance = await polkadot.query(config);
    const converted = chain.usesChainDecimals
      ? convertDecimals(balance, polkadot.decimals, asset.decimals)
      : balance;

    return amount.copyWith({ amount: converted });
  }

  const contract = createContract(chain, config) as BalanceContractInterface;
  const balance = await contract.getBalance();

  return amount.copyWith({ amount: balance });
}

export interface GetMinParams {
  asset: Asset;
  builder?: AssetMinConfigBuilder;
  chain: AnyChain;
}

export async function getMin({
  asset,
  builder,
  chain,
}: GetMinParams): Promise<AssetAmount> {
  const zero = AssetAmount.fromChainAsset(chain.getChainAsset(asset), {
    amount: 0n,
  });

  if (builder && (Parachain.is(chain) || EvmParachain.is(chain))) {
    const polkadot = await PolkadotService.create(chain);
    const min = await polkadot.query(
      builder.build({ asset: zero.getMinAssetId() }),
    );

    return zero.copyWith({ amount: min });
  }

  if (zero.min) {
    return zero.copyWith({ amount: zero.min });
  }

  return zero;
}

export interface GetDestinationFeeParams {
  asset: Asset;
  chain: AnyChain;
  fee: number | FeeConfigBuilder;
}

export async function getDestinationFee({
  asset,
  chain,
  fee,
}: GetDestinationFeeParams): Promise<AssetAmount> {
  const zero = AssetAmount.fromChainAsset(chain.getChainAsset(asset), {
    amount: 0n,
  });

  if (Number.isFinite(fee)) {
    return zero.copyWith({
      amount: fee as number,
    });
  }

  if (Parachain.is(chain) || EvmParachain.is(chain)) {
    const polkadot = await PolkadotService.create(chain);
    const cfg = (fee as FeeConfigBuilder).build({
      api: polkadot.api,
      asset: zero.getAssetId(),
    });

    return zero.copyWith({
      amount: await cfg.call(),
    });
  }

  return zero;
}
