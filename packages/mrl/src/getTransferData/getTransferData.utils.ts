import {
  BATCH_CONTRACT_ABI,
  BATCH_CONTRACT_ADDRESS,
  type ContractConfig,
  ERC20_ABI,
  type ExtrinsicConfig,
  MrlBuilder,
  type MrlBuilderParams,
  type Transact,
} from '@moonbeam-network/xcm-builder';
import {
  type AssetRoute,
  getMoonChain,
  moonbaseAlpha,
  moonbeam,
} from '@moonbeam-network/xcm-config';
import {
  type DestinationChainTransferData,
  PolkadotService,
  convertToChainDecimals,
  getMin,
} from '@moonbeam-network/xcm-sdk';
import { AssetAmount, EvmParachain } from '@moonbeam-network/xcm-types';
import {
  getMultilocationDerivedAddresses,
  getPolkadotApi,
} from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import {
  http,
  type Address,
  createPublicClient,
  encodeFunctionData,
} from 'viem';
import type {
  MoonChainTransferData,
  SourceTransferData,
} from '../mrl.interfaces';

const MOON_CHAIN_AUTOMATIC_GAS_ESTIMATION = {
  [moonbeam.key]: 1273110n,
  [moonbaseAlpha.key]: 1470417n,
};

interface DataParams {
  destinationData: DestinationChainTransferData;
  moonChainData: MoonChainTransferData;
  sourceData: SourceTransferData;
}

export function getMoonChainFeeValueOnSource({
  destinationData,
  moonChainData,
  sourceData,
}: DataParams): Big {
  const isSourceParachain = EvmParachain.isAnyParachain(sourceData.chain);
  const isDestinationMoonChain = destinationData.chain.isEqual(
    moonChainData.chain,
  );
  const isSameAssetPayingMoonChainFee = sourceData.balance.isSame(
    moonChainData.fee,
  );
  return !isDestinationMoonChain &&
    isSourceParachain &&
    isSameAssetPayingMoonChainFee
    ? convertToChainDecimals({
        asset: moonChainData.fee,
        target: sourceData.chain.getChainAsset(moonChainData.fee),
      }).toBig()
    : Big(0);
}

export function getMrlMin({
  destinationData,
  moonChainData,
  sourceData,
}: DataParams): AssetAmount {
  const minInDestination = getMin(destinationData);
  const min = AssetAmount.fromChainAsset(
    sourceData.chain.getChainAsset(sourceData.balance),
    {
      amount: minInDestination.amount,
    },
  );
  const moonChainFee = getMoonChainFeeValueOnSource({
    destinationData,
    moonChainData,
    sourceData,
  });
  const relayerFee = sourceData.relayerFee?.amount
    ? sourceData.relayerFee.toBig()
    : Big(0);

  return min.copyWith({
    amount: BigInt(min.toBig().add(moonChainFee).add(relayerFee).toFixed()),
  });
}

export interface BuildTransferParams {
  asset: AssetAmount;
  destinationAddress: string;
  feeAsset: AssetAmount;
  isAutomatic: boolean;
  route: AssetRoute;
  sendOnlyRemoteExecution?: boolean;
  sourceAddress: string;
}

export async function buildTransfer(params: BuildTransferParams) {
  const { route } = params;
  if (!route.mrl) {
    throw new Error(
      `MrlConfigBuilder is not defined for source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol}`,
    );
  }
  if (params.isAutomatic && !route.mrl.isAutomaticPossible) {
    throw new Error(
      `Route from source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol} does not allow the automatic option`,
    );
  }
  const builderParams = await getMrlBuilderParams(params);

  return route.mrl.transfer.build({
    ...builderParams,
    transact: EvmParachain.isAnyParachain(route.source.chain)
      ? await getTransact(builderParams)
      : undefined,
  });
}

export async function getMrlBuilderParams({
  asset,
  destinationAddress,
  feeAsset,
  isAutomatic,
  route,
  sendOnlyRemoteExecution,
  sourceAddress,
}: BuildTransferParams): Promise<MrlBuilderParams> {
  if (!route.mrl) {
    throw new Error(
      `MrlConfigBuilder is not defined for source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol}`,
    );
  }
  const source = route.source.chain;
  const destination = route.destination.chain;

  const moonChain = getMoonChain(source);
  const [sourceApi, destinationApi, moonApi] = await Promise.all([
    EvmParachain.isAnyParachain(source) ? getPolkadotApi(source.ws) : undefined,
    EvmParachain.isAnyParachain(destination)
      ? getPolkadotApi(destination.ws)
      : undefined,
    getPolkadotApi(moonChain.ws),
  ]);

  return {
    asset,
    destination,
    destinationAddress,
    destinationApi,
    fee: feeAsset,
    isAutomatic,
    moonApi,
    moonAsset: moonChain.nativeAsset,
    moonChain,
    sendOnlyRemoteExecution,
    source,
    sourceAddress,
    sourceApi,
  };
}

async function getTransact(params: MrlBuilderParams): Promise<Transact> {
  const { sourceAddress, source, moonChain } = params;
  const polkadot = await PolkadotService.create(moonChain);
  const moonGasLimit = await getMoonGasLimit(params);

  if (!EvmParachain.isAnyParachain(source)) {
    throw new Error('Source chain must be Parachain or EvmParachain');
  }

  const { address20 } = getMultilocationDerivedAddresses({
    address: sourceAddress,
    paraId: source.parachainId,
    isParents: true,
  });
  const extrinsic = MrlBuilder()
    .wormhole()
    .extrinsic()
    .ethereumXcm()
    .transact()
    .build({ ...params, moonGasLimit }) as ExtrinsicConfig;
  const { weight } = await polkadot.getPaymentInfo(address20, extrinsic);

  return {
    call: polkadot.getExtrinsicCallHash(extrinsic),
    txWeight: {
      refTime: weight.refTime.toBigInt(),
      proofSize: weight.proofSize.toBigInt(),
    },
  };
}

async function getMoonGasLimit(params: MrlBuilderParams): Promise<bigint> {
  const { asset, isAutomatic, moonChain, source, sourceAddress } = params;

  if (!EvmParachain.isAnyParachain(source)) {
    throw new Error('Source chain must be Parachain or EvmParachain');
  }

  const client = createPublicClient({
    chain: moonChain.getViemChain(),
    transport: http(),
  });
  const { address20 } = getMultilocationDerivedAddresses({
    address: sourceAddress,
    paraId: source.parachainId,
    isParents: true,
  });

  // TODO: we have a problem to calculate the gasEstimation for automatic:
  // it requires the computedOriginAccount to have the balance for the call
  // which we don't have when we make the call. We hardcode it for now
  if (isAutomatic) {
    return (MOON_CHAIN_AUTOMATIC_GAS_ESTIMATION[moonChain.key] * 110n) / 100n;
  }

  const contract = MrlBuilder()
    .wormhole()
    .contract()
    .TokenBridge()
    .transferTokens()
    .build({
      ...params,
      asset: asset.copyWith({ amount: 0n }),
    }) as ContractConfig;

  const approveTx = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [contract.address as Address, 0n],
  });

  const tokenAddressOnMoonChain = moonChain.getChainAsset(asset).address as
    | Address
    | undefined;

  if (!tokenAddressOnMoonChain) {
    throw new Error(
      `Asset ${asset.symbol} does not have a token address on chain ${moonChain.name}`,
    );
  }

  const batchAll = encodeFunctionData({
    abi: BATCH_CONTRACT_ABI,
    functionName: 'batchAll',
    args: [
      [tokenAddressOnMoonChain, contract.address as Address],
      [0n, 0n], // Value to send for each call
      [approveTx, contract.encodeFunctionData()], // Call data for each call
      [], // Gas limit for each call
    ],
  });

  const gasEstimation = await client.estimateGas({
    account: address20,
    to: BATCH_CONTRACT_ADDRESS,
    data: batchAll,
  });

  return (gasEstimation * 110n) / 100n;
}
