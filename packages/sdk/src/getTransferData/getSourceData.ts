/* eslint-disable @typescript-eslint/no-use-before-define */
import { ContractConfig, ExtrinsicConfig } from '@moonbeam-network/xcm-builder';
import {
  AssetConfig,
  FeeAssetConfig,
  TransferConfig,
} from '@moonbeam-network/xcm-config';
import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import { convertDecimals, toBigInt } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import { TransferContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';
import { EvmSigner, SourceChainTransferData } from '../sdk.interfaces';
import { getBalance, getMin } from './getTransferData.utils';

export interface GetSourceDataParams {
  transferConfig: TransferConfig;
  destinationAddress: string;
  destinationFee: AssetAmount;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getSourceData({
  transferConfig,
  destinationAddress,
  destinationFee,
  polkadot,
  sourceAddress,
}: GetSourceDataParams): Promise<SourceChainTransferData> {
  const {
    destination,
    source: { chain, config },
  } = transferConfig;
  const asset = chain.getChainAsset(transferConfig.asset);
  const feeAsset = config.fee ? chain.getChainAsset(config.fee.asset) : asset;

  const balance = await getBalance({
    address: sourceAddress,
    asset,
    builder: config.balance,
    chain,
    polkadot,
  });
  const feeBalance = config.fee
    ? await getBalance({
        address: sourceAddress,
        asset: feeAsset,
        builder: config.fee.balance,
        chain,
        polkadot,
      })
    : balance;
  // eslint-disable-next-line no-nested-ternary
  const destinationFeeBalance = config.destinationFee.asset.isEqual(asset)
    ? balance
    : config.destinationFee.asset.isEqual(feeAsset)
      ? feeBalance
      : await getBalance({
          address: sourceAddress,
          asset: chain.getChainAsset(config.destinationFee.asset),
          builder: config.destinationFee.balance,
          chain,
          polkadot,
        });

  const min = await getMin(config, polkadot);
  const { existentialDeposit } = polkadot;

  const extrinsic = config.extrinsic?.build({
    address: destinationAddress,
    amount: balance.amount,
    asset: asset.getAssetId(),
    destination: destination.chain,
    fee: destinationFee.amount,
    feeAsset: destinationFee.getAssetId(),
    palletInstance: asset.getAssetPalletInstance(),
    source: chain,
  });

  const contract = config.contract?.build({
    address: destinationAddress,
    amount: balance.amount,
    asset: asset.address || asset.getAssetId(),
    destination: destination.chain,
    fee: destinationFee.amount,
    feeAsset: feeAsset.address || feeAsset.getAssetId(),
  });

  const fee = await getFee({
    balance,
    chain,
    contract,
    extrinsic,
    feeBalance,
    feeConfig: config.fee,
    polkadot,
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
    chain,
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
  chain: AnyChain;
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
    const fee = await contract.getFee(balance.amount, sourceAddress);

    return feeBalance.copyWith({ amount: fee });
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
  chain: AnyChain;
  assets: AssetConfig[];
  evmSigner?: EvmSigner;
  polkadot: PolkadotService;
}

export async function getAssetsBalances({
  address,
  chain,
  assets,
  polkadot,
}: GetAssetsBalancesParams): Promise<AssetAmount[]> {
  const uniqueAssets = assets.reduce(
    (acc: AssetConfig[], asset: AssetConfig) => {
      if (!acc.some((a: AssetConfig) => a.asset.isEqual(asset.asset))) {
        return [asset, ...acc];
      }

      return acc;
    },
    [],
  );

  const balances = await Promise.all(
    uniqueAssets.map(async (config: AssetConfig) =>
      // eslint-disable-next-line no-await-in-loop
      getBalance({
        address,
        asset: chain.getChainAsset(config.asset),
        builder: config.balance,
        chain,
        polkadot,
      }),
    ),
  );

  return balances;
}
