/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  AssetRoute,
  getMoonChain,
  moonbaseAlpha,
  moonbeam,
} from '@moonbeam-network/xcm-config';
import { AssetAmount, EvmParachain } from '@moonbeam-network/xcm-types';
import {
  getMultilocationDerivedAddresses,
  getPolkadotApi,
} from '@moonbeam-network/xcm-utils';
import {
  BATCH_CONTRACT_ABI,
  BATCH_CONTRACT_ADDRESS,
  ContractConfig,
  ERC20_ABI,
  ExtrinsicConfig,
  MrlBuilder,
  MrlBuilderParams,
  Transact,
} from '@moonbeam-network/xcm-builder';
import { Address, createPublicClient, encodeFunctionData, http } from 'viem';
import { PolkadotService } from '@moonbeam-network/xcm-sdk';

const MOON_CHAIN_AUTOMATIC_GAS_ESTIMATION = {
  [moonbeam.key]: 657226n,
  [moonbaseAlpha.key]: 1271922n,
};

export interface BuildTransferParams {
  asset: AssetAmount;
  destinationAddress: string;
  destinationFee: AssetAmount;
  route: AssetRoute;
  sourceAddress: string;
}

export async function buildTransfer({
  asset,
  destinationAddress,
  destinationFee,
  route,
  sourceAddress,
}: BuildTransferParams) {
  if (!route.mrl) {
    throw new Error(
      `MrlConfigBuilder is not defined for source chain ${route.source.chain.name} and asset ${route.asset.originSymbol}`,
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

  const params: MrlBuilderParams = {
    asset,
    destination,
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

  return route.mrl.transfer.build({
    ...params,
    transact: EvmParachain.isAnyParachain(source)
      ? await getTransact(params)
      : undefined,
  });
}

export async function getTransact(params: MrlBuilderParams): Promise<Transact> {
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

export async function getMoonGasLimit(
  params: MrlBuilderParams,
): Promise<bigint> {
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
    return MOON_CHAIN_AUTOMATIC_GAS_ESTIMATION[moonChain.key];
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
