/* eslint-disable @typescript-eslint/no-use-before-define */
import { ContractConfig, ExtrinsicConfig } from '@moonbeam-network/xcm-builder';
import { AssetRoute, FeeAssetConfig } from '@moonbeam-network/xcm-config';
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
  source: AnyParachain;
  sourceAddress: string;
}

export async function getSourceData({
  route,
  destinationAddress,
  destinationFee,
  source,
  sourceAddress,
}: GetSourceDataParams): Promise<SourceChainTransferData> {
  const [sourcePolkadot, destinationPolkadot] =
    await PolkadotService.createMulti([
      source,
      route.destination as AnyParachain,
    ]);
  const asset = source.getChainAsset(route.asset);
  const feeAsset = route.fee ? source.getChainAsset(route.fee.asset) : asset;

  const balance = await getBalance({
    address: sourceAddress,
    asset,
    builder: route.balance,
    chain: source,
    polkadot: sourcePolkadot,
  });
  const feeBalance = route.fee
    ? await getBalance({
        address: sourceAddress,
        asset: feeAsset,
        builder: route.fee.balance,
        chain: source,
        polkadot: sourcePolkadot,
      })
    : balance;
  // eslint-disable-next-line no-nested-ternary
  const destinationFeeBalance = route.destinationFee.asset.isEqual(asset)
    ? balance
    : route.destinationFee.asset.isEqual(feeAsset)
      ? feeBalance
      : await getBalance({
          address: sourceAddress,
          asset: source.getChainAsset(route.destinationFee.asset),
          builder: route.destinationFee.balance,
          chain: source,
          polkadot: sourcePolkadot,
        });

  const min = await getMin(route, sourcePolkadot);
  const { existentialDeposit } = sourcePolkadot;

  const extrinsic = route.extrinsic?.build({
    asset: balance,
    destination: route.destination as AnyParachain,
    destinationAddress,
    destinationApi: destinationPolkadot.api,
    fee: destinationFee,
    source,
    sourceAddress,
    sourceApi: sourcePolkadot.api,
  });

  const contract = route.contract?.build({
    address: destinationAddress,
    amount: balance.amount,
    asset: asset.address || asset.getAssetId(),
    destination: route.destination as AnyParachain,
    fee: destinationFee.amount,
    feeAsset: destinationFee.address || destinationFee.getAssetId(),
  });

  const fee = await getFee({
    balance,
    chain: source,
    contract,
    destinationFee,
    extrinsic,
    feeBalance,
    feeConfig: route.fee,
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
  feeConfig?: FeeAssetConfig;
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
  polkadot: PolkadotService;
}

export async function getAssetsBalances({
  address,
  chain,
  routes,
  polkadot,
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
        builder: route.balance,
        chain,
        polkadot,
      }),
    ),
  );

  return balances;
}
