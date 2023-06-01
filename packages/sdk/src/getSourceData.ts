/* eslint-disable @typescript-eslint/no-use-before-define */
import { ContractConfig, ExtrinsicConfig } from '@moonbeam-network/xcm-builder';
import { AssetConfig, TransferConfig } from '@moonbeam-network/xcm-config';
import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import { convertDecimals } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import { Signer as EthersSigner } from 'ethers';
import { createContract } from './contract';
import { PolkadotService } from './polkadot';
import { SourceChainTransferData } from './sdk.interfaces';

export interface GetSourceDataParams {
  transferConfig: TransferConfig;
  destinationAddress: string;
  destinationFee: AssetAmount;
  ethersSigner?: EthersSigner;
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
    decimals: await polkadot.getAssetDecimals(asset),
  });
  const zeroFeeAmount = config.fee?.asset
    ? AssetAmount.fromAsset(config.fee.asset, {
        amount: 0n,
        decimals: await polkadot.getAssetDecimals(config.fee.asset),
      })
    : zeroAmount;

  const { balance, feeBalance, min } = await getBalancesAndMin({
    address: sourceAddress,
    chain,
    config,
    polkadot,
  });

  const extrinsic = config.extrinsic?.build({
    address: destinationAddress,
    amount: balance,
    asset: chain.getAssetId(asset),
    destination: destination.chain,
    fee: destinationFee.amount,
    feeAsset: chain.getAssetId(asset),
    palletInstance: chain.getAssetPalletInstance(asset),
    source: chain,
  });
  const contract = config.contract?.build({
    address: destinationAddress,
    amount: balance,
    asset: chain.getAssetId(asset),
    destination: destination.chain,
    fee: destinationFee.amount,
    feeAsset: chain.getAssetId(asset),
  });
  const fee = await getFee({
    amount: balance,
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
    existentialDeposit,
    fee: feeAmount,
    feeBalance: feeBalanceAmount,
    max: maxAmount,
    min: minAmount,
  };
}

export interface GetBalancesParams {
  address: string;
  chain: AnyChain;
  config: AssetConfig;
  polkadot: PolkadotService;
}

export async function getBalancesAndMin({
  address,
  chain,
  config,
  polkadot,
}: GetBalancesParams) {
  const balance = await polkadot.query(
    config.balance.build({
      address,
      asset: chain.getBalanceAssetId(config.asset),
    }),
  );
  const feeBalance = config.fee
    ? await polkadot.query(
        config.fee.balance.build({
          address,
          asset: chain.getBalanceAssetId(config.fee.asset),
        }),
      )
    : balance;
  const min = config.min
    ? await polkadot.query(
        config.min.build({ asset: chain.getMinAssetId(config.asset) }),
      )
    : 0n;

  return {
    balance,
    feeBalance,
    min,
  };
}

export interface GetFeeParams {
  amount: bigint;
  contract?: ContractConfig;
  decimals: number;
  ethersSigner?: EthersSigner;
  extrinsic?: ExtrinsicConfig;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getFee({
  amount,
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

    return getContractFee(amount, contract, decimals, ethersSigner);
  }

  if (extrinsic) {
    return getExtrinsicFee(extrinsic, polkadot, sourceAddress);
  }

  throw new Error('Either contract or extrinsic must be provided');
}

export async function getContractFee(
  amount: bigint,
  config: ContractConfig,
  decimals: number,
  ethersSigner: EthersSigner,
): Promise<bigint> {
  const contract = createContract(config, ethersSigner);
  const fee = await contract.getFee(amount);

  return convertDecimals(fee, 18, decimals);
}

export async function getExtrinsicFee(
  extrinsic: ExtrinsicConfig,
  polkadot: PolkadotService,
  sourceAddress: string,
): Promise<bigint> {
  return polkadot.getFee(sourceAddress, extrinsic);
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
    amount: result.lt(0) ? 0n : BigInt(result.toString()),
  });
}