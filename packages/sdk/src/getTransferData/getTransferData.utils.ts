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
} from '@moonbeam-network/xcm-types';
import { convertDecimals } from '@moonbeam-network/xcm-utils';
import { AssetRoute } from '@moonbeam-network/xcm-config';
import Big from 'big.js';
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

  if (SubstrateQueryConfig.is(config) && EvmParachain.isAnyParachain(chain)) {
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

  if (builder && EvmParachain.isAnyParachain(chain)) {
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

export interface GetMaxParams {
  balance: AssetAmount;
  existentialDeposit?: AssetAmount;
  fee: AssetAmount;
  min: AssetAmount;
}

export function getMax({
  balance,
  existentialDeposit,
  fee,
  min,
}: GetMaxParams): AssetAmount {
  const result = balance
    .toBig()
    .minus(min.toBig())
    .minus(
      existentialDeposit && balance.isSame(existentialDeposit)
        ? existentialDeposit.toBig()
        : Big(0),
    )
    .minus(balance.isSame(fee) ? fee.toBig() : Big(0));

  return balance.copyWith({
    amount: result.lt(0) ? 0n : BigInt(result.toFixed()),
  });
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

  if (EvmParachain.isAnyParachain(chain)) {
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

export interface ConvertToChainDecimalsParams {
  asset: AssetAmount;
  chain: AnyChain;
}

export function convertToChainDecimals({
  asset,
  chain,
}: ConvertToChainDecimalsParams): AssetAmount {
  const targetAsset = chain.getChainAsset(asset);

  return AssetAmount.fromChainAsset(targetAsset, {
    amount: asset.convertDecimals(targetAsset.decimals).amount,
  });
}

export async function getExistentialDeposit(
  chain: AnyChain,
): Promise<AssetAmount | undefined> {
  if (EvmParachain.isAnyParachain(chain)) {
    const polkadot = await PolkadotService.create(chain);

    return polkadot.existentialDeposit;
  }

  return undefined;
}

export interface GetDestinationFeeBalanceParams {
  balance: AssetAmount;
  feeBalance: AssetAmount;
  route: AssetRoute;
  sourceAddress: string;
}

export async function getDestinationFeeBalance({
  balance,
  feeBalance,
  route,
  sourceAddress,
}: GetDestinationFeeBalanceParams): Promise<AssetAmount> {
  if (route.destination.fee.asset.isEqual(balance)) {
    return balance;
  }

  if (route.destination.fee.asset.isEqual(feeBalance)) {
    return feeBalance;
  }

  if (!route.source.destinationFee?.balance) {
    throw new Error(
      `BalanceBuilder must be defined for source.destinationFee.balance for AssetRoute`,
    );
  }

  return getBalance({
    address: sourceAddress,
    asset: route.source.chain.getChainAsset(route.destination.fee.asset),
    builder: route.source.destinationFee?.balance,
    chain: route.source.chain,
  });
}
