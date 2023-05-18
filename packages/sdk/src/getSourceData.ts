/* eslint-disable @typescript-eslint/no-use-before-define */
import { ContractConfig, ExtrinsicConfig } from '@moonbeam-network/xcm-builder';
import { AssetConfig, TransferConfig } from '@moonbeam-network/xcm-config';
import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import { Signer as EthersSigner } from 'ethers';
import { createContract } from './contract';
import { PolkadotService } from './polkadot';
import { SourceChainTransferData } from './sdk.interfaces';
import { createZeroAssets } from './sdk.utils';

export interface GetTransferDataParams {
  config: TransferConfig;
  destinationAddress: string;
  ethersSigner: EthersSigner;
  polkadotSigner: PolkadotSigner;
  sourceAddress: string;
}

export interface GetSourceDataParams {
  config: TransferConfig;
  destinationAddress: string;
  destinationFee: bigint;
  ethersSigner: EthersSigner;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getSourceData({
  config,
  destinationAddress,
  destinationFee,
  ethersSigner,
  polkadot,
  sourceAddress,
}: GetSourceDataParams): Promise<SourceChainTransferData> {
  const { chain } = config.source;
  const { zeroAmount, zeroFeeAmount } = await createZeroAssets({
    asset: config.asset,
    chain,
    feeAsset: config.source.config.fee?.asset,
    polkadot,
  });

  const { balance, feeBalance, min } = await getBalancesAndMin({
    address: sourceAddress,
    chain,
    config: config.source.config,
    polkadot,
  });

  const extrinsic = config.source.config.extrinsic?.build({
    address: destinationAddress,
    amount: balance,
    asset: config.source.chain.getAssetId(config.asset),
    destination: config.destination.chain,
    fee: destinationFee,
    feeAsset: config.destination.chain.getAssetId(config.asset),
    palletInstance: config.destination.chain.getAssetPalletInstance(
      config.asset,
    ),
    source: config.source.chain,
  });
  const contract = config.source.config.contract?.build({
    address: destinationAddress,
    amount: balance,
    asset: config.source.chain.getAssetId(config.asset),
    destination: config.destination.chain,
    fee: destinationFee,
    feeAsset: config.destination.chain.getAssetId(config.asset),
  });
  const fee = await getFee({
    contract,
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
  config: AssetConfig;
  chain: AnyChain;
  polkadot: PolkadotService;
}

export async function getBalancesAndMin({
  address,
  config,
  chain,
  polkadot,
}: GetBalancesParams) {
  const assetId = chain.getBalanceAssetId(config.asset);

  const balance = await polkadot.query(
    config.balance.build({
      address,
      asset: assetId,
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
    ? await polkadot.query(config.min.build({ asset: assetId }))
    : 0n;

  return {
    balance,
    feeBalance,
    min,
  };
}

export interface GetFeeParams {
  contract?: ContractConfig;
  ethersSigner: EthersSigner;
  extrinsic?: ExtrinsicConfig;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getFee({
  contract,
  ethersSigner,
  extrinsic,
  polkadot,
  sourceAddress,
}: GetFeeParams): Promise<bigint> {
  if (contract) {
    return getContractFee(contract, ethersSigner);
  }

  if (extrinsic) {
    return getExtrinsicFee(extrinsic, polkadot, sourceAddress);
  }

  throw new Error('Either contract or extrinsic must be provided');
}

export async function getContractFee(
  config: ContractConfig,
  ethersSigner: EthersSigner,
): Promise<bigint> {
  const contract = createContract(config, ethersSigner);

  return contract.getFee();
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
  const isSameTokenPayingFee = balanceAmount.key === feeAmount.key;
  let result = balanceAmount.toBig().minus(minAmount.toBig());

  if (isSameTokenPayingFee) {
    result = result.minus(existentialDeposit.toBig()).minus(feeAmount.toBig());
  }

  return balanceAmount.copyWith({
    amount: result.lt(0) ? 0n : BigInt(result.toString()),
  });
}
