import {
  ContractConfig,
  ExtrinsicConfig,
  type ExtrinsicWormholeConfig,
  WormholeConfig,
} from '@moonbeam-network/xcm-builder';
import type { AssetRoute, FeeConfig } from '@moonbeam-network/xcm-config';
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
import type { SourceTransferData } from '../mrl.interfaces';
import { WormholeService } from '../services/wormhole';
import { buildTransfer } from './getTransferData.utils';

export interface GetSourceDataParams {
  route: AssetRoute;
  destinationAddress: string;
  destinationFee: AssetAmount;
  sourceAddress: string;
}

export async function getSourceData({
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

  const existentialDeposit = await getExistentialDeposit(source);
  const min = await getAssetMin({
    asset,
    builder: route.source.min,
    chain: source,
  });

  const transfer = await buildTransfer({
    asset: balance,
    destinationAddress,
    destinationFee,
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

  const relayFee = await getRelayFee({
    balance,
    chain: source,
    transfer,
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
    destinationFeeBalance,
    existentialDeposit,
    fee,
    feeBalance,
    max,
    min,
    relayFee,
  };
}

export interface GetFeeParams {
  balance: AssetAmount;
  chain: AnyChain;
  destinationFee: AssetAmount;
  feeBalance: AssetAmount;
  feeConfig?: FeeConfig;
  sourceAddress: string;
  transfer:
    | ContractConfig
    | ExtrinsicConfig
    | ExtrinsicWormholeConfig
    | WormholeConfig;
}

export interface GetRelayFeeParams {
  balance: AssetAmount;
  chain: AnyChain;
  transfer:
    | ContractConfig
    | ExtrinsicConfig
    | ExtrinsicWormholeConfig
    | WormholeConfig;
}

export async function getFee({
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
      chain: chain as EvmChain | EvmParachain,
      contract: transfer,
      destinationFee,
      feeBalance,
      feeConfig,
    });
  }

  const extrinsic = ExtrinsicConfig.is(transfer)
    ? transfer
    : transfer.extrinsic;

  return getExtrinsicFee({
    address: sourceAddress,
    balance,
    chain: chain as AnyParachain,
    extrinsic,
    feeBalance,
    feeConfig,
  });
}

export async function getRelayFee({
  balance,
  chain,
  transfer,
}: GetRelayFeeParams): Promise<AssetAmount | undefined> {
  if (ExtrinsicConfig.is(transfer) || ContractConfig.is(transfer)) {
    return undefined;
  }

  const wormholeConfig = WormholeConfig.is(transfer)
    ? transfer
    : transfer.wormholeConfig;

  const wh = WormholeService.create(chain as EvmChain | EvmParachain);
  const fee = await wh.getFee(wormholeConfig);

  return AssetAmount.fromChainAsset(chain.getChainAsset(balance), {
    amount: fee.relayFee?.amount || 0n,
  });
}
