/* eslint-disable @typescript-eslint/no-use-before-define */
import { ContractConfig, ExtrinsicConfig } from '@moonbeam-network/xcm-builder';
import { AssetRoute, FeeConfig } from '@moonbeam-network/xcm-config';
import { AnyParachain, AssetAmount } from '@moonbeam-network/xcm-types';
import { convertDecimals, toBigInt } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import { TransferContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';
import { EvmSigner, SourceChainTransferData } from '../sdk.interfaces';
import { getBalance, getMin } from './getTransferData.utils';

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
  const source = route.source.chain as AnyParachain;
  const destination = route.destination.chain as AnyParachain;
  const [sourcePolkadot, destinationPolkadot] =
    await PolkadotService.createMulti([source, destination]);
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

  let destinationFeeBalance: AssetAmount;

  if (route.destination.fee.asset.isEqual(asset)) {
    destinationFeeBalance = balance;
  } else if (route.destination.fee.asset.isEqual(feeAsset)) {
    destinationFeeBalance = feeBalance;
  } else {
    if (!route.source.destinationFee?.balance) {
      throw new Error(
        `BalanceBuilder must be defined for source.destinationFee.balance for AssetRoute`,
      );
    }

    destinationFeeBalance = await getBalance({
      address: sourceAddress,
      asset: source.getChainAsset(route.destination.fee.asset),
      builder: route.source.destinationFee?.balance,
      chain: source,
    });
  }

  const min = await getMin({ asset, builder: route.source.min, chain: source });
  const { existentialDeposit } = sourcePolkadot;

  const extrinsic = route.extrinsic?.build({
    asset: balance,
    destination: route.destination.chain as AnyParachain,
    destinationAddress,
    destinationApi: destinationPolkadot.api,
    fee: destinationFee,
    source,
    sourceAddress,
    sourceApi: sourcePolkadot.api,
  });

  const contract = route.contract?.build({
    asset: balance,
    destination: route.destination.chain as AnyParachain,
    destinationAddress,
    destinationApi: destinationPolkadot.api,
    fee: destinationFee,
    source,
    sourceAddress,
    sourceApi: sourcePolkadot.api,
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

export interface GetMaxParams {
  balance: AssetAmount;
  existentialDeposit: AssetAmount;
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
      balance.isSame(existentialDeposit) ? existentialDeposit.toBig() : Big(0),
    )
    .minus(balance.isSame(fee) ? fee.toBig() : Big(0));

  return balance.copyWith({
    amount: result.lt(0) ? 0n : BigInt(result.toFixed()),
  });
}

export interface GetAssetsBalancesParams {
  address: string;
  chain: AnyParachain;
  routes: AssetRoute[];
  evmSigner?: EvmSigner;
}

export async function getAssetsBalances({
  address,
  chain,
  routes,
}: GetAssetsBalancesParams): Promise<AssetAmount[]> {
  const uniqueRoutes = routes.reduce((acc: AssetRoute[], route: AssetRoute) => {
    if (!acc.some((a: AssetRoute) => a.asset.isEqual(route.asset))) {
      return [route, ...acc];
    }

    return acc;
  }, []);

  const balances = await Promise.all(
    uniqueRoutes.map(async (route: AssetRoute) =>
      // eslint-disable-next-line no-await-in-loop
      getBalance({
        address,
        asset: chain.getChainAsset(route.asset),
        builder: route.source.balance,
        chain,
      }),
    ),
  );

  return balances;
}
