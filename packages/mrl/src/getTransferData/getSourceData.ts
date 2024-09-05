/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  AssetRoute,
  FeeConfig,
  getMoonChain,
} from '@moonbeam-network/xcm-config';
import {
  getBalance,
  getDestinationFeeBalance,
  getExistentialDeposit,
  getMax,
  getMin,
  PolkadotService,
  SourceChainTransferData,
} from '@moonbeam-network/xcm-sdk';
import {
  AnyParachain,
  AssetAmount,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import {
  convertDecimals,
  getPolkadotApi,
  toBigInt,
} from '@moonbeam-network/xcm-utils';
import { MrlBuilderParams } from '@moonbeam-network/xcm-builder';
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
    contract,
    destinationFee,
    extrinsic,
    feeBalance,
    feeConfig: route.source.fee,
    polkadot: sourcePolkadot,
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
  feeBalance: AssetAmount;
  contract?: ContractConfig;
  chain: AnyParachain;
  destinationFee: AssetAmount;
  extrinsic?: ExtrinsicConfig;
  feeConfig?: FeeConfig;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getFee({
  balance,
  feeBalance,
  chain,
  contract: contractConfig,
  destinationFee,
  extrinsic,
  feeConfig,
  polkadot,
  sourceAddress,
}: GetFeeParams): Promise<AssetAmount> {
  if (!contractConfig && !extrinsic) {
    throw new Error('Either contract or extrinsic must be provided');
  }

  if (contractConfig) {
    const contract = createContract(
      chain,
      contractConfig,
    ) as TransferContractInterface;
    try {
      const fee = await contract.getFee(balance.amount, sourceAddress);

      return feeBalance.copyWith({ amount: fee });
    } catch (error) {
      /**
       * Contract can throw an error if user balance is smaller than fee.
       * Or if you try to send 0 as amount.
       */
      throw new Error(
        `Can't get a fee, make sure you have ${destinationFee.toDecimal()} ${destinationFee.getSymbol()} in your source balance, needed for destination fees`,
        { cause: error },
      );
    }
  }

  const fee = await getExtrinsicFee(
    balance,
    extrinsic as ExtrinsicConfig,
    polkadot,
    sourceAddress,
  );

  const extra = feeConfig?.extra
    ? toBigInt(feeConfig.extra, feeBalance.decimals)
    : 0n;
  const totalFee = fee + extra;

  const converted = chain.usesChainDecimals
    ? convertDecimals(totalFee, polkadot.decimals, feeBalance.decimals)
    : totalFee;

  return feeBalance.copyWith({ amount: converted });
}

export async function getExtrinsicFee(
  balance: AssetAmount,
  extrinsic: ExtrinsicConfig,
  polkadot: PolkadotService,
  sourceAddress: string,
): Promise<bigint> {
  /**
   * If account has no balance (account doesn't exist),
   * we can't get the fee from some chains.
   * Example: Phala - PHA
   */
  try {
    return await polkadot.getFee(sourceAddress, extrinsic);
  } catch (error) {
    if (balance) {
      throw error;
    }

    return 0n;
  }
}
