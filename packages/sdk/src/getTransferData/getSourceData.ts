/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  ContractConfig,
  ExtrinsicConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import { FeeAssetConfig, TransferConfig } from '@moonbeam-network/xcm-config';
import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import { convertDecimals, toBigInt } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import { TransferContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';
import { EvmSigner, SourceChainTransferData } from '../sdk.interfaces';
import {
  GetBalancesParams,
  getBalance,
  getDecimals,
  getMin,
} from './getTransferData.utils';

export interface GetSourceDataParams {
  transferConfig: TransferConfig;
  destinationAddress: string;
  destinationFee: AssetAmount;
  evmSigner?: EvmSigner;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getSourceData({
  transferConfig,
  destinationAddress,
  destinationFee,
  evmSigner,
  polkadot,
  sourceAddress,
}: GetSourceDataParams): Promise<SourceChainTransferData> {
  const {
    asset,
    destination,
    source: { chain, config },
  } = transferConfig;
  const zeroAmount = AssetAmount.fromAsset(asset, {
    amount: 0n,
    decimals: await getDecimals({
      address: destinationAddress,
      chain,
      config,
      evmSigner,
      polkadot,
    }),
  });
  const zeroFeeAmount = config.fee?.asset
    ? AssetAmount.fromAsset(config.fee.asset, {
        amount: 0n,
        decimals: await getDecimals({
          address: destinationAddress,
          asset: config.fee.asset,
          chain,
          config,
          evmSigner,
          polkadot,
        }),
      })
    : zeroAmount;
  const zeroDestinationFeeAmount = config.destinationFee?.asset
    ? AssetAmount.fromAsset(config.destinationFee.asset, {
        amount: 0n,
        decimals: await getDecimals({
          address: destinationAddress,
          asset: config.destinationFee.asset,
          chain,
          config,
          evmSigner,
          polkadot,
        }),
      })
    : zeroAmount;

  const balance = await getBalance({
    address: sourceAddress,
    chain,
    config,
    decimals: zeroAmount.decimals,
    evmSigner,
    polkadot,
  });

  const feeBalance = await getFeeBalance({
    address: sourceAddress,
    balance,
    chain,
    decimals: zeroFeeAmount.decimals,
    feeConfig: config.fee,
    polkadot,
  });

  const destinationFeeBalance = config.asset.isEqual(
    config.destinationFee.asset,
  )
    ? balance
    : await getFeeBalance({
        address: sourceAddress,
        balance,
        chain,
        decimals: zeroDestinationFeeAmount.decimals,
        feeConfig: config.destinationFee,
        polkadot,
      });

  const min = await getMin(config, polkadot);

  const extrinsic = config.extrinsic?.build({
    address: destinationAddress,
    amount: balance,
    asset: chain.getAssetId(asset),
    destination: destination.chain,
    fee: destinationFee.amount,
    feeAsset: chain.getAssetId(destinationFee),
    palletInstance: chain.getAssetPalletInstance(asset),
    source: chain,
  });

  const contract = config.contract?.build({
    address: destinationAddress,
    amount: balance,
    asset: chain.getAssetId(asset),
    destination: destination.chain,
    fee: destinationFee.amount,
    feeAsset: chain.getAssetId(destinationFee),
  });
  const fee = await getFee({
    balance,
    chain,
    contract,
    decimals: zeroFeeAmount.decimals,
    evmSigner,
    extrinsic,
    feeConfig: config.fee,
    polkadot,
    sourceAddress,
  });

  const balanceAmount = zeroAmount.copyWith({ amount: balance });
  const { existentialDeposit } = polkadot;
  const feeAmount = zeroFeeAmount.copyWith({ amount: fee });
  const feeBalanceAmount = zeroFeeAmount.copyWith({ amount: feeBalance });
  const destinationFeeBalanceAmount = zeroDestinationFeeAmount.copyWith({
    amount: destinationFeeBalance,
  });
  const minAmount = zeroAmount.copyWith({ amount: min });

  const maxAmount = getMax({
    balanceAmount,
    existentialDeposit,
    feeAmount,
    minAmount,
  });

  return {
    balance: balanceAmount,
    chain,
    destinationFeeBalance: destinationFeeBalanceAmount,
    existentialDeposit,
    fee: feeAmount,
    feeBalance: feeBalanceAmount,
    max: maxAmount,
    min: minAmount,
  };
}

export interface GetFeeBalanceParams
  extends Omit<GetBalancesParams, 'config' | 'evmSigner'> {
  balance: bigint;
  feeConfig: FeeAssetConfig | undefined;
}

export async function getFeeBalance({
  address,
  balance,
  chain,
  decimals,
  feeConfig,
  polkadot,
}: GetFeeBalanceParams) {
  if (!feeConfig) {
    return balance;
  }

  const feeBalance = await polkadot.query(
    feeConfig.balance.build({
      address,
      asset: polkadot.chain.getBalanceAssetId(feeConfig.asset),
    }) as SubstrateQueryConfig,
  );

  return chain.usesChainDecimals
    ? convertDecimals(feeBalance, polkadot.decimals, decimals)
    : feeBalance;
}

export interface GetFeeParams {
  balance: bigint;
  contract?: ContractConfig;
  chain: AnyChain;
  decimals: number;
  evmSigner?: EvmSigner;
  extrinsic?: ExtrinsicConfig;
  feeConfig?: FeeAssetConfig;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getFee({
  balance,
  chain,
  contract,
  decimals,
  evmSigner,
  extrinsic,
  feeConfig,
  polkadot,
  sourceAddress,
}: GetFeeParams): Promise<bigint> {
  if (contract) {
    if (!evmSigner) {
      throw new Error('EVM Signer must be provided');
    }

    return getContractFee(balance, contract, decimals, evmSigner);
  }

  if (extrinsic) {
    const extrinsicFee = await getExtrinsicFee(
      balance,
      extrinsic,
      polkadot,
      sourceAddress,
    );

    const xcmDeliveryFee = getXcmDeliveryFee(decimals, feeConfig);

    const totalFee = extrinsicFee + xcmDeliveryFee;

    return chain.usesChainDecimals
      ? convertDecimals(totalFee, polkadot.decimals, decimals)
      : totalFee;
  }

  throw new Error('Either contract or extrinsic must be provided');
}

export async function getContractFee(
  balance: bigint,
  config: ContractConfig,
  decimals: number,
  evmSigner: EvmSigner,
): Promise<bigint> {
  const contract = createContract(
    config,
    evmSigner,
  ) as TransferContractInterface;
  const fee = await contract.getFee(balance);

  return convertDecimals(fee, 18, decimals);
}

export async function getExtrinsicFee(
  balance: bigint,
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

function getXcmDeliveryFee(
  decimals: number,
  feeConfig?: FeeAssetConfig,
): bigint {
  return feeConfig?.xcmDeliveryFeeAmount
    ? toBigInt(feeConfig.xcmDeliveryFeeAmount, decimals)
    : 0n;
}

export interface GetMaxParams {
  balanceAmount: AssetAmount;
  existentialDeposit: AssetAmount;
  feeAmount: AssetAmount;
  minAmount: AssetAmount;
}

export function getMax({
  balanceAmount,
  existentialDeposit,
  feeAmount,
  minAmount,
}: GetMaxParams): AssetAmount {
  const result = balanceAmount
    .toBig()
    .minus(minAmount.toBig())
    .minus(
      balanceAmount.isSame(existentialDeposit)
        ? existentialDeposit.toBig()
        : Big(0),
    )
    .minus(balanceAmount.isSame(feeAmount) ? feeAmount.toBig() : Big(0));

  return balanceAmount.copyWith({
    amount: result.lt(0) ? 0n : BigInt(result.toFixed()),
  });
}
