import {
  type BridgeFeeConfigBuilder,
  type BridgeFeeConfigBuilderParams,
  ContractConfig,
  MrlBuilder,
  type MrlTransferConfig,
  Provider,
  SnowbridgeConfig,
  SubstrateQueryConfig,
  WormholeConfig,
} from '@moonbeam-network/xcm-builder';
import type { FeeConfig, MrlAssetRoute } from '@moonbeam-network/xcm-config';
import {
  EvmService,
  getAssetMin,
  getBalance,
  getContractFee,
  getDestinationFeeBalance,
  getExistentialDeposit,
  getExtrinsicFee,
  getMax,
  PolkadotService,
} from '@moonbeam-network/xcm-sdk';
import {
  type AnyChain,
  type AnyParachain,
  AssetAmount,
  EvmChain,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import type { SourceTransferData } from '../mrl.interfaces';
import { SnowbridgeService } from '../services/snowbridge';
import { WormholeService } from '../services/wormhole';
import {
  type BuildTransferParams,
  buildTransfer,
  getAmountForTransferSimulation,
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
  const destination = route.destination.chain;
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

  const bridgeChainFeeBalance = await getBridgeChainFeeBalance({
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

  const protocolFee = await getProtocolFee({
    source,
    destination,
    asset,
    feeAsset,
    balance,
    protocolFee: route.source.protocolFee,
    address: destinationAddress,
  });

  const transfer = await buildTransfer({
    asset: getAmountForTransferSimulation(balance, protocolFee),
    protocolFee,
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
    bridgeChainFeeBalance,
    existentialDeposit,
    fee,
    feeBalance,
    max,
    min,
    otherFees: {
      protocol: protocolFee,
      relayer: relayerFee?.amount ? relayerFee : undefined,
    },
  };
}

interface GetFeeParams {
  balance: AssetAmount;
  chain: AnyChain;
  destinationFee: AssetAmount;
  feeBalance: AssetAmount;
  feeConfig?: FeeConfig;
  sourceAddress: string;
  transfer: MrlTransferConfig;
}

interface GetRelayFeeParams extends BuildTransferParams {
  chain: AnyChain;
  transfer: MrlTransferConfig;
}

interface GetWormholeFeeParams {
  asset: AssetAmount;
  chain: AnyChain;
  config: MrlTransferConfig;
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

  if (SnowbridgeConfig.is(transfer)) {
    const snowbridge = SnowbridgeService.create(chain as EvmChain);
    try {
      const feeAmount = await snowbridge.getFee(sourceAddress, transfer);

      return AssetAmount.fromChainAsset(chain.getChainAsset(feeBalance), {
        amount: feeAmount,
      });
    } catch (error) {
      console.error(error);
      return feeBalance.copyWith({ amount: 0n });
    }
  }

  if (ContractConfig.is(transfer)) {
    try {
      return getContractFee({
        address: sourceAddress,
        balance,
        chain: chain as EvmChain | EvmParachain,
        contract: transfer,
        destinationFee,
        feeBalance,
        feeConfig,
      });
    } catch (error) {
      // A lot of EVM chains throw an error if the account has not enough balance or similar situations
      // So we return 0n here in MRL, so it doesn't affect regular XCM flow
      console.error(error);
      return feeBalance.copyWith({ amount: 0n });
    }
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
  if (
    route.mrl.transfer.provider === Provider.Snowbridge ||
    SnowbridgeConfig.is(transfer)
  ) {
    return undefined;
  }

  if (WormholeConfig.is(transfer)) {
    return getWormholeFee({ asset, chain, config: transfer });
  }

  if (route.mrl.transfer.provider === Provider.Wormhole) {
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

  return;
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

interface GetBridgeChainFeeBalanceParams {
  balance: AssetAmount;
  feeBalance: AssetAmount;
  route: MrlAssetRoute;
  sourceAddress: string;
}

async function getBridgeChainFeeBalance({
  balance,
  feeBalance,
  route,
  sourceAddress,
}: GetBridgeChainFeeBalanceParams): Promise<AssetAmount | undefined> {
  if (!route.source.bridgeChainFee) {
    return undefined;
  }

  if (route.mrl?.bridgeChain.fee.asset.isEqual(balance)) {
    return balance;
  }

  if (route.mrl?.bridgeChain.fee.asset.isEqual(feeBalance)) {
    return feeBalance;
  }

  if (!route.source.bridgeChainFee.balance) {
    throw new Error(
      'BalanceBuilder must be defined for source.bridgeChainFee.balance for MrlAssetRoute',
    );
  }

  return getBalance({
    address: sourceAddress,
    asset: route.source.chain.getChainAsset(route.source.bridgeChainFee.asset),
    builder: route.source.bridgeChainFee.balance,
    chain: route.source.chain,
  });
}

interface GetProtocolFeeParams extends BridgeFeeConfigBuilderParams {
  protocolFee?: number | BridgeFeeConfigBuilder;
}

async function getProtocolFee({
  address,
  asset,
  feeAsset,
  balance,
  protocolFee,
  destination,
  source,
}: GetProtocolFeeParams): Promise<AssetAmount> {
  if (typeof protocolFee === 'number') {
    return AssetAmount.fromChainAsset(feeAsset, {
      amount: protocolFee,
    });
  }

  const config = protocolFee?.build({
    address,
    asset,
    feeAsset,
    balance,
    destination,
    source,
  });

  if (ContractConfig.is(config) && EvmChain.is(source)) {
    const evm = EvmService.create(source);

    const amount = await evm.read(config);

    if (typeof amount !== 'bigint') {
      throw new Error(
        `Error getting bridge fee: expected bigint from contract call, but received ${typeof amount}. `,
      );
    }

    return AssetAmount.fromChainAsset(feeAsset, {
      amount,
    });
  }

  if (SubstrateQueryConfig.is(config) && EvmParachain.isAnyParachain(source)) {
    const polkadot = await PolkadotService.create(source);
    const amount = await polkadot.query(config);
    return AssetAmount.fromChainAsset(feeAsset, {
      amount,
    });
  }

  return AssetAmount.fromChainAsset(feeAsset, {
    amount: 0n,
  });
}
