import {
  BATCH_CONTRACT_ABI,
  BATCH_CONTRACT_ADDRESS,
  type ContractConfig,
  ERC20_ABI,
  type ExtrinsicConfig,
  MrlBuilder,
  type MrlBuilderParams,
  Provider,
  type Transact,
} from '@moonbeam-network/xcm-builder';
import {
  type MrlAssetRoute,
  moonbaseAlpha,
  moonbeam,
  moonriver,
} from '@moonbeam-network/xcm-config';
import {
  convertToChainDecimals,
  type DestinationChainTransferData,
  getMin,
  PolkadotService,
} from '@moonbeam-network/xcm-sdk';
import { AssetAmount, EvmParachain } from '@moonbeam-network/xcm-types';
import {
  getMultilocationDerivedAddresses,
  getPolkadotApi,
} from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import {
  type Address,
  createPublicClient,
  encodeFunctionData,
  http,
} from 'viem';
import type {
  BridgeChainTransferData,
  SourceTransferData,
} from '../mrl.interfaces';

const MOON_CHAIN_AUTOMATIC_GAS_ESTIMATION = {
  [moonbeam.key]: 1273110n,
  [moonriver.key]: 1273110n,
  [moonbaseAlpha.key]: 1470417n,
};

interface DataParams {
  destinationData: DestinationChainTransferData;
  bridgeChainData: BridgeChainTransferData;
  sourceData: SourceTransferData;
}

export function getBridgeChainFeeValueOnSource({
  destinationData,
  bridgeChainData,
  sourceData,
}: DataParams): Big {
  const isSourceParachain = EvmParachain.isAnyParachain(sourceData.chain);
  const isDestinationBridgeChain = destinationData.chain.isEqual(
    bridgeChainData.chain,
  );
  const isSameAssetPayingBridgeChainFee = sourceData.balance.isSame(
    bridgeChainData.fee,
  );
  return !isDestinationBridgeChain &&
    isSourceParachain &&
    isSameAssetPayingBridgeChainFee
    ? convertToChainDecimals({
        asset: bridgeChainData.fee,
        target: sourceData.chain.getChainAsset(bridgeChainData.fee),
      }).toBig()
    : Big(0);
}

export function getMrlMin({
  destinationData,
  bridgeChainData,
  sourceData,
}: DataParams): AssetAmount {
  const minInDestination = getMin(destinationData);
  const min = AssetAmount.fromChainAsset(
    sourceData.chain.getChainAsset(sourceData.balance),
    {
      amount: minInDestination.amount,
    },
  );
  const bridgeChainFee = getBridgeChainFeeValueOnSource({
    destinationData,
    bridgeChainData,
    sourceData,
  });
  const relayerFee = sourceData.otherFees?.relayer?.amount
    ? sourceData.otherFees.relayer.toBig()
    : Big(0);

  return min.copyWith({
    amount: BigInt(min.toBig().add(bridgeChainFee).add(relayerFee).toFixed()),
  });
}

export interface BuildTransferParams {
  asset: AssetAmount;
  protocolFee?: AssetAmount;
  destinationAddress: string;
  feeAsset: AssetAmount;
  isAutomatic: boolean;
  route: MrlAssetRoute;
  sendOnlyRemoteExecution?: boolean;
  sourceAddress: string;
}

function requiresTransact(route: MrlAssetRoute): boolean {
  return (
    route.mrl?.transfer.provider === Provider.Wormhole &&
    EvmParachain.isAnyParachain(route.source.chain)
  );
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
    transact: requiresTransact(route)
      ? await getTransact(builderParams)
      : undefined,
  });
}

export async function getMrlBuilderParams({
  asset,
  protocolFee,
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

  const bridgeChain = route.mrl.bridgeChain.chain;
  const [sourceApi, destinationApi, bridgeApi] = await Promise.all([
    EvmParachain.isAnyParachain(source) ? getPolkadotApi(source.ws) : undefined,
    EvmParachain.isAnyParachain(destination)
      ? getPolkadotApi(destination.ws)
      : undefined,
    getPolkadotApi(bridgeChain.ws),
  ]);

  return {
    asset,
    protocolFee,
    destination,
    destinationAddress,
    destinationApi,
    fee: feeAsset,
    isAutomatic,
    moonApi: bridgeApi,
    moonAsset: bridgeChain.nativeAsset,
    bridgeChain,
    sendOnlyRemoteExecution,
    source,
    sourceAddress,
    sourceApi,
  };
}

async function getTransact(
  params: MrlBuilderParams,
): Promise<Transact | undefined> {
  const { sourceAddress, source, bridgeChain } = params;
  const polkadot = await PolkadotService.create(bridgeChain);
  const bridgeChainGasLimit = await getBridgeChainGasLimit(params);

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
    .build({ ...params, bridgeChainGasLimit }) as ExtrinsicConfig;
  const { weight } = await polkadot.getPaymentInfo(address20, extrinsic);

  console.log('extrinsic', extrinsic.getArgs());

  return {
    call: polkadot.getExtrinsicCallHash(extrinsic),
    txWeight: {
      refTime: weight.refTime.toBigInt(),
      proofSize: weight.proofSize.toBigInt(),
    },
  };
}

async function getBridgeChainGasLimit(
  params: MrlBuilderParams,
): Promise<bigint> {
  const { asset, isAutomatic, bridgeChain, source, sourceAddress } = params;

  if (!EvmParachain.isAnyParachain(source)) {
    throw new Error('Source chain must be Parachain or EvmParachain');
  }

  if (!EvmParachain.is(bridgeChain)) {
    throw new Error('Bridge chain must be an EvmParachain');
  }

  const client = createPublicClient({
    chain: bridgeChain.getViemChain(),
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
    return (MOON_CHAIN_AUTOMATIC_GAS_ESTIMATION[bridgeChain.key] * 110n) / 100n;
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

  const tokenAddressOnBridgeChain = bridgeChain.getChainAsset(asset).address as
    | Address
    | undefined;

  if (!tokenAddressOnBridgeChain) {
    throw new Error(
      `Asset ${asset.symbol} does not have a token address on chain ${bridgeChain.name}`,
    );
  }

  const batchAll = encodeFunctionData({
    abi: BATCH_CONTRACT_ABI,
    functionName: 'batchAll',
    args: [
      [tokenAddressOnBridgeChain, contract.address as Address],
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

export function getAmountForTransferSimulation(
  balance: AssetAmount,
  protocolFee: AssetAmount,
): AssetAmount {
  return balance.copyWith({
    amount:
      balance.amount - protocolFee.amount > 0
        ? balance.amount - protocolFee.amount
        : 0n,
  });
}
