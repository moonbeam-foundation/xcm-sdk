import {
  ContractConfig,
  type ExtrinsicConfig,
  MrlBuilder,
  WormholeConfig,
} from '@moonbeam-network/xcm-builder';
import type { FeeConfig, MrlAssetRoute } from '@moonbeam-network/xcm-config';
import {
  getAssetMin,
  getBalance,
  getContractFee,
  getDestinationFeeBalance,
  getExistentialDeposit,
  getExtrinsicFee,
  getMax,
} from '@moonbeam-network/xcm-sdk';
import {
  type AnyChain,
  type AnyParachain,
  AssetAmount,
  type EvmChain,
  type EvmParachain,
} from '@moonbeam-network/xcm-types';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import type { SourceTransferData } from '../mrl.interfaces';
import { WormholeService } from '../services/wormhole';
import {
  type BuildTransferParams,
  buildTransfer,
  getMrlBuilderParams,
} from './getTransferData.utils';

interface GetSourceDataParams {
  isAutomatic: boolean;
  route: MrlAssetRoute;
  destinationAddress: string;
  destinationFee: AssetAmount;
  sourceAddress: string;
}

export async function getSourceData({
  isAutomatic,
  route,
  destinationAddress,
  destinationFee,
  sourceAddress,
}: GetSourceDataParams): Promise<SourceTransferData> {
  if (!route.mrl) {
    throw new Error(
      `MrlConfigBuilder is not defined for source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol}`,
    );
  }

  const source = route.source.chain;
  const asset = source.getChainAsset(route.source.asset);
  const feeAsset = route.source.fee
    ? source.getChainAsset(route.source.fee.asset)
    : asset;

  const balance = await getBalance({
    address: sourceAddress,
    asset,
    builder: route.source.balance,
    chain: source,
  });

  const feeBalance = route.source.fee
    ? await getBalance({
        address: sourceAddress,
        asset: feeAsset,
        builder: route.source.fee.balance,
        chain: source,
      })
    : balance;

  const destinationFeeBalance = await getDestinationFeeBalance({
    balance,
    feeBalance,
    route,
    sourceAddress,
  });

  const moonChainFeeBalance = await getMoonChainFeeBalance({
    balance,
    feeBalance,
    route,
    sourceAddress,
  });

  const existentialDeposit = await getExistentialDeposit(source);

  const min = await getAssetMin({
    asset,
    builder: route.source.min,
    chain: source,
  });

  const transfer = await buildTransfer({
    asset: balance,
    destinationAddress,
    feeAsset: feeBalance,
    isAutomatic,
    route,
    sourceAddress,
  });

  const fee = await getFee({
    balance,
    chain: source,
    destinationFee,
    transfer,
    feeBalance,
    feeConfig: route.source.fee,
    sourceAddress,
  });

  const relayerFee = await getRelayerFee({
    chain: source,
    transfer,
    asset: balance,
    feeAsset: feeBalance,
    isAutomatic,
    destinationAddress,
    route,
    sourceAddress,
  });

  const max = getMax({
    balance,
    existentialDeposit,
    fee,
    min,
  });

  return {
    balance,
    chain: source,
    destinationFee,
    destinationFeeBalance,
    moonChainFeeBalance,
    existentialDeposit,
    fee,
    feeBalance,
    max,
    min,
    relayerFee,
  };
}

interface GetFeeParams {
  balance: AssetAmount;
  chain: AnyChain;
  destinationFee: AssetAmount;
  feeBalance: AssetAmount;
  feeConfig?: FeeConfig;
  sourceAddress: string;
  transfer: ContractConfig | ExtrinsicConfig | WormholeConfig;
}

interface GetRelayFeeParams extends BuildTransferParams {
  chain: AnyChain;
  transfer: ContractConfig | ExtrinsicConfig | WormholeConfig;
}

interface GetWormholeFeeParams {
  asset: AssetAmount;
  chain: AnyChain;
  config: ContractConfig | ExtrinsicConfig | WormholeConfig;
}

async function getFee({
  balance,
  feeBalance,
  chain,
  destinationFee,
  transfer,
  feeConfig,
  sourceAddress,
}: GetFeeParams): Promise<AssetAmount> {
  if (WormholeConfig.is(transfer)) {
    // TODO
    return AssetAmount.fromChainAsset(chain.getChainAsset(feeBalance), {
      amount: 0n,
    });
  }

  if (ContractConfig.is(transfer)) {
    return getContractFee({
      address: sourceAddress,
      balance,
      chain: chain as EvmChain | EvmParachain,
      contract: transfer,
      destinationFee,
      feeBalance,
      feeConfig,
    });
  }

  return getExtrinsicFee({
    address: sourceAddress,
    balance,
    chain: chain as AnyParachain,
    extrinsic: transfer,
    feeBalance,
    feeConfig,
  });
}

async function getRelayerFee({
  asset,
  chain,
  destinationAddress,
  feeAsset,
  isAutomatic,
  route,
  sourceAddress,
  transfer,
}: GetRelayFeeParams): Promise<AssetAmount | undefined> {
  if (WormholeConfig.is(transfer)) {
    return getWormholeFee({ asset, chain, config: transfer });
  }

  // TODO this is only valid for Wormhole Provider
  const builderParams = await getMrlBuilderParams({
    asset,
    destinationAddress,
    feeAsset,
    isAutomatic,
    route,
    sourceAddress,
  });

  const wormholeConfig = MrlBuilder()
    .wormhole()
    .wormhole()
    .tokenTransfer()
    .build(builderParams);

  return getWormholeFee({ asset, chain, config: wormholeConfig });
}

async function getWormholeFee({
  asset,
  chain,
  config,
}: GetWormholeFeeParams): Promise<AssetAmount | undefined> {
  if (WormholeConfig.is(config)) {
    const safetyAmount = toBigInt(0.000001, asset.decimals);

    const wh = WormholeService.create(chain as EvmChain | EvmParachain);
    const fee = await wh.getFee(config);

    return AssetAmount.fromChainAsset(chain.getChainAsset(asset), {
      amount: fee?.relayFee ? fee.relayFee.amount + safetyAmount : 0n,
    });
  }

  return;
}

interface GetMoonChainFeeBalanceParams {
  balance: AssetAmount;
  feeBalance: AssetAmount;
  route: MrlAssetRoute;
  sourceAddress: string;
}

async function getMoonChainFeeBalance({
  balance,
  feeBalance,
  route,
  sourceAddress,
}: GetMoonChainFeeBalanceParams): Promise<AssetAmount | undefined> {
  if (!route.source.moonChainFee) {
    return undefined;
  }

  if (route.mrl?.moonChain.fee.asset.isEqual(balance)) {
    return balance;
  }

  if (route.mrl?.moonChain.fee.asset.isEqual(feeBalance)) {
    return feeBalance;
  }

  if (!route.source.moonChainFee.balance) {
    throw new Error(
      'BalanceBuilder must be defined for source.moonChainFee.balance for MrlAssetRoute',
    );
  }

  return getBalance({
    address: sourceAddress,
    asset: route.source.chain.getChainAsset(route.source.moonChainFee.asset),
    builder: route.source.moonChainFee.balance,
    chain: route.source.chain,
  });
}
