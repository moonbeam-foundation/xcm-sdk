/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  CallType,
  ContractConfig,
  ExtrinsicConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import {
  AssetConfig,
  DestinationFeeConfig,
  FeeAssetConfig,
  TransferConfig,
} from '@moonbeam-network/xcm-config';
import {
  AnyChain,
  AssetAmount,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import {
  convertDecimals,
  toBigInt,
  toDecimal,
} from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import {
  BalanceContractInterface,
  TransferContractInterface,
  createContract,
} from '../contract';
import { PolkadotService } from '../polkadot';
import { EvmSigner, SourceChainTransferData } from '../sdk.interfaces';
import { GetBalancesParams, getBalance, getMin } from './getTransferData.utils';

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

  const feeBalanceConfig = config.fee?.balance.build({
    address: destinationAddress,
    asset: feeAsset.getBalanceAssetId(),
  });

  const balance = await getBalance({
    address: sourceAddress,
    chain,
    config,
    polkadot,
  });

  const feeBalance = await getFeeBalance({
    address: sourceAddress,
    balance,
    chain,
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

  const destinationFeeBalanceAmount = zeroDestinationFeeAmount.copyWith({
    amount: destinationFeeBalance,
  });

  const fee = await getFee({
    balance,
    chain,
    contract,
    decimals: zeroFeeAmount.decimals,
    destinationFeeBalanceAmount,
    destinationFeeConfig: config.destinationFee,
    extrinsic,
    feeConfig: config.fee,
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
  feeConfig: FeeAssetConfig | undefined;
}

export async function getFeeBalance({
  address,
  chain,
  feeConfig,
  polkadot,
}: GetFeeBalanceParams) {
  const cfg = feeConfig.balance.build({
    address,
    asset: polkadot.chain.getBalanceAssetId(feeConfig.asset),
  }) as SubstrateQueryConfig;

  if (cfg.type === CallType.Evm) {
    const contract = createContract(chain, cfg) as BalanceContractInterface;

    const decimalsFromContract = await contract.getDecimals();
    const balanceFromContract = await contract.getBalance();

    return chain.usesChainDecimals
      ? convertDecimals(
          balanceFromContract,
          polkadot.decimals,
          decimalsFromContract,
        )
      : balanceFromContract;
  }

  const feeBalance = await polkadot.query(cfg);

  return chain.usesChainDecimals
    ? convertDecimals(feeBalance, polkadot.decimals, decimals)
    : feeBalance;
}

export interface GetFeeParams {
  balance: bigint;
  contract?: ContractConfig;
  chain: AnyChain;
  decimals: number;
  extrinsic?: ExtrinsicConfig;
  feeConfig?: FeeAssetConfig;
  destinationFeeConfig?: DestinationFeeConfig;
  destinationFeeBalanceAmount?: AssetAmount;
  polkadot: PolkadotService;
  sourceAddress: string;
}

export async function getFee({
  balance,
  chain,
  contract,
  decimals,
  destinationFeeConfig,
  destinationFeeBalanceAmount,
  extrinsic,
  feeConfig,
  polkadot,
  sourceAddress,
}: GetFeeParams): Promise<bigint> {
  if (contract) {
    if (
      destinationFeeConfig &&
      destinationFeeBalanceAmount &&
      typeof destinationFeeConfig.amount === 'number'
    ) {
      const destinationFeeBalance = Number(
        toDecimal(
          destinationFeeBalanceAmount.amount,
          destinationFeeBalanceAmount.decimals,
        ),
      );
      if (
        destinationFeeBalance &&
        destinationFeeConfig.amount > destinationFeeBalance
      ) {
        throw new Error(
          `Can't get a fee, make sure you have ${destinationFeeConfig?.amount} ${destinationFeeConfig?.asset.originSymbol} in your source balance, needed for destination fees`,
        );
      }
    }

    return getContractFee({
      address: sourceAddress,
      balance,
      chain: chain as EvmParachain,
      config: contract,
      decimals,
    });
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

export async function getContractFee({
  address,
  balance,
  config,
  decimals,
  chain,
}: {
  address: string;
  balance: bigint;
  config: ContractConfig;
  decimals: number;
  chain: EvmParachain;
}): Promise<bigint> {
  const contract = createContract(chain, config) as TransferContractInterface;
  const fee = await contract.getFee(balance, address);

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
    uniqueAssets.map(async (asset: AssetConfig) => {
      const decimals = await getDecimals({
        address,
        asset: asset.asset,
        chain,
        config: asset,
        polkadot,
      });

      // eslint-disable-next-line no-await-in-loop
      const balance = await getBalance({
        address,
        chain,
        config: asset,
        decimals,
        polkadot,
      });

      const assetAmount = AssetAmount.fromAsset(asset.asset, {
        amount: balance,
        decimals,
      });

      return assetAmount;
    }),
  );

  return balances;
}
