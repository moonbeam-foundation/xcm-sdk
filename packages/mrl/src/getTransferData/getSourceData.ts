/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  AssetRoute,
  FeeConfig,
  getMoonChain,
} from '@moonbeam-network/xcm-config';
import {
  getBalance,
  getContractFee,
  getDestinationFeeBalance,
  getExistentialDeposit,
  getExtrinsicFee,
  getMax,
  getMin,
  SourceChainTransferData,
} from '@moonbeam-network/xcm-sdk';
import {
  AnyChain,
  AnyParachain,
  AssetAmount,
  EvmChain,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import {
  ContractConfig,
  ExtrinsicConfig,
  MrlBuilderParams,
  WormholeConfig,
} from '@moonbeam-network/xcm-builder';
import { getTransact } from './getTransferData.utils';

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
}: GetSourceDataParams): Promise<SourceChainTransferData> {
  if (!route.mrl) {
    throw new Error(
      `MrlConfigBuilder is not defined for source chain ${route.source.chain.name} and asset ${route.asset.originSymbol}`,
    );
  }

  const source = route.source.chain;
  const destination = route.destination.chain;
  const asset = source.getChainAsset(route.asset);
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

  const existentialDeposit = await getExistentialDeposit(destination);
  const min = await getMin({ asset, builder: route.source.min, chain: source });

  const moonChain = getMoonChain(source);
  const [sourceApi, destinationApi, moonApi] = await Promise.all([
    EvmParachain.isAnyParachain(source) ? getPolkadotApi(source.ws) : undefined,
    EvmParachain.isAnyParachain(destination)
      ? getPolkadotApi(destination.ws)
      : undefined,
    getPolkadotApi(moonChain.ws),
  ]);

  const params: MrlBuilderParams = {
    asset: balance,
    destination: route.destination.chain,
    destinationAddress,
    destinationApi,
    fee: destinationFee,
    isAutomatic: route.mrl.isAutomatic,
    moonApi,
    moonAsset: moonChain.nativeAsset,
    moonChain,
    source,
    sourceAddress,
    sourceApi,
  };
  const transfer = route.mrl.transfer.build({
    ...params,
    transact: EvmParachain.isAnyParachain(source)
      ? await getTransact(params)
      : undefined,
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
  };
}

export interface GetFeeParams {
  balance: AssetAmount;
  chain: AnyChain;
  destinationFee: AssetAmount;
  feeBalance: AssetAmount;
  feeConfig?: FeeConfig;
  sourceAddress: string;
  transfer: ContractConfig | ExtrinsicConfig | WormholeConfig;
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
  // TODO: What do we do if transfer is WormholeConfig?

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

  return getExtrinsicFee({
    address: sourceAddress,
    balance,
    chain: chain as AnyParachain,
    extrinsic: transfer as ExtrinsicConfig,
    feeBalance,
    feeConfig,
  });
}
