/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  ContractConfig,
  ExtrinsicConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import { FeeAssetConfig, TransferConfig } from '@moonbeam-network/xcm-config';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { convertDecimals } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import { Signer as EthersSigner } from 'ethers';
import { TransferContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';
import { SourceChainTransferData } from '../sdk.interfaces';
import { getBalance, getDecimals, getMin } from './getTransferData.utils';

export interface GetSourceDataParams {
  transferConfig: TransferConfig;
  destinationAddress: string;
  destinationFee: AssetAmount;
  ethersSigner: EthersSigner;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getSourceData({
  transferConfig,
  destinationAddress,
  destinationFee,
  ethersSigner,
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
      config,
      ethersSigner,
      polkadot,
    }),
  });
  const zeroFeeAmount = config.fee?.asset
    ? AssetAmount.fromAsset(config.fee.asset, {
        amount: 0n,
        decimals: await getDecimals({
          address: destinationAddress,
          asset: config.fee.asset,
          config,
          ethersSigner,
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
          config,
          ethersSigner,
          polkadot,
        }),
      })
    : zeroAmount;

  const balance = await getBalance({
    address: sourceAddress,
    config,
    ethersSigner,
    polkadot,
  });

  const feeBalance = await getFeeBalances({
    address: sourceAddress,
    balance,
    feeConfig: config.fee,
    polkadot,
  });

  const destinationFeeBalance = config.asset.isEqual(
    config.destinationFee.asset,
  )
    ? balance
      : await getFeeBalances({
          address: sourceAddress,
          balance,
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
    contract,
    decimals: zeroFeeAmount.decimals,
    ethersSigner,
    extrinsic,
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

export interface GetBalancesParams {
  address: string;
  balance: bigint;
  feeConfig: FeeAssetConfig | undefined;
  polkadot: PolkadotService;
}

export async function getFeeBalances({
  address,
  balance,
  feeConfig,
  polkadot,
}: GetBalancesParams) {
  return feeConfig
    ? polkadot.query(
        feeConfig.balance.build({
          address,
          asset: polkadot.chain.getBalanceAssetId(feeConfig.asset),
        }) as SubstrateQueryConfig,
      )
    : balance;
}

export interface GetFeeParams {
  balance: bigint;
  contract?: ContractConfig;
  decimals: number;
  ethersSigner?: EthersSigner;
  extrinsic?: ExtrinsicConfig;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getFee({
  balance,
  contract,
  decimals,
  ethersSigner,
  extrinsic,
  polkadot,
  sourceAddress,
}: GetFeeParams): Promise<bigint> {
  if (contract) {
    if (!ethersSigner) {
      throw new Error('Ethers signer must be provided');
    }

    return getContractFee(balance, contract, decimals, ethersSigner);
  }

  if (extrinsic) {
    return getExtrinsicFee(balance, extrinsic, polkadot, sourceAddress);
  }

  throw new Error('Either contract or extrinsic must be provided');
}

export async function getContractFee(
  balance: bigint,
  config: ContractConfig,
  decimals: number,
  ethersSigner: EthersSigner,
): Promise<bigint> {
  const contract = createContract(
    config,
    ethersSigner,
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
