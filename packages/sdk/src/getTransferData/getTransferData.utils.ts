import {
  type AssetMinConfigBuilder,
  type BalanceConfigBuilder,
  ContractConfig,
  EvmQueryConfig,
  type ExtrinsicConfig,
  type FeeConfigBuilder,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import type { AssetRoute, FeeConfig } from '@moonbeam-network/xcm-config';
import {
  type AnyChain,
  type AnyParachain,
  type Asset,
  AssetAmount,
  type ChainAsset,
  EvmChain,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import { convertDecimals, toBigInt } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import type {
  DestinationChainTransferData,
  SourceChainTransferData,
} from '../sdk.interfaces';
import { EvmService } from '../services/evm/EvmService';
import { PolkadotService } from '../services/polkadot';

export interface GetBalancesParams {
  address: string;
  asset: ChainAsset;
  builder: BalanceConfigBuilder;
  chain: AnyChain;
}
export async function getBalance({
  address,
  asset,
  builder,
  chain,
}: GetBalancesParams): Promise<AssetAmount> {
  const config = builder.build({
    address,
    asset,
  });
  const amount = AssetAmount.fromChainAsset(asset, { amount: 0n });

  if (SubstrateQueryConfig.is(config) && EvmParachain.isAnyParachain(chain)) {
    const polkadot = await PolkadotService.create(chain);
    const balance = await polkadot.query(config);
    const converted = chain.usesChainDecimals
      ? convertDecimals(balance, polkadot.decimals, asset.decimals)
      : balance;

    return amount.copyWith({ amount: converted });
  }

  if (EvmChain.is(chain) || EvmParachain.is(chain)) {
    const evm = EvmService.create(chain);

    if (ContractConfig.is(config)) {
      const balance = await evm.getBalance(address, config);

      return amount.copyWith({ amount: balance });
    }

    if (EvmQueryConfig.is(config)) {
      const balance = await evm.query(config);

      return amount.copyWith({ amount: balance });
    }
  }

  throw new Error(
    `Can't get balance for ${address} on chain ${chain.name} and asset ${asset.symbol}`,
  );
}

export interface GetMinParams {
  asset: Asset;
  builder?: AssetMinConfigBuilder;
  chain: AnyChain;
}

export async function getAssetMin({
  asset,
  builder,
  chain,
}: GetMinParams): Promise<AssetAmount> {
  const zero = AssetAmount.fromChainAsset(chain.getChainAsset(asset), {
    amount: 0n,
  });

  if (builder && EvmParachain.isAnyParachain(chain)) {
    const polkadot = await PolkadotService.create(chain);
    const min = await polkadot.query(
      builder.build({ asset: zero.getMinAssetId(), address: zero.address }),
    );

    return zero.copyWith({ amount: min });
  }

  if (zero.min) {
    return zero.copyWith({ amount: zero.min });
  }

  return zero;
}

export function getMin({
  balance,
  existentialDeposit,
  fee,
  min,
}: DestinationChainTransferData) {
  const result = Big(0)
    .plus(balance.isSame(fee) ? fee.toBig() : Big(0))
    .plus(
      existentialDeposit &&
        balance.isSame(existentialDeposit) &&
        balance.toBig().lt(existentialDeposit.toBig())
        ? existentialDeposit.toBig()
        : Big(0),
    )
    .plus(balance.toBig().lt(min.toBig()) ? min.toBig() : Big(0));

  return balance.copyWith({
    amount: BigInt(result.toFixed()),
  });
}

export interface GetMaxParams {
  balance: AssetAmount;
  existentialDeposit?: AssetAmount;
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
      existentialDeposit && balance.isSame(existentialDeposit)
        ? existentialDeposit.toBig()
        : Big(0),
    )
    .minus(balance.isSame(fee) ? fee.toBig() : Big(0));

  return balance.copyWith({
    amount: result.lt(0) ? 0n : BigInt(result.toFixed()),
  });
}

export interface GetDestinationFeeParams {
  address: string;
  asset: Asset;
  feeAsset: Asset;
  destination: AnyChain;
  fee: number | FeeConfigBuilder;
}

export async function getDestinationFee({
  address,
  asset,
  destination,
  fee,
  feeAsset,
}: GetDestinationFeeParams): Promise<AssetAmount> {
  const zero = AssetAmount.fromChainAsset(destination.getChainAsset(feeAsset), {
    amount: 0n,
  });

  if (Number.isFinite(fee)) {
    return zero.copyWith({
      amount: fee as number,
    });
  }

  if (EvmParachain.isAnyParachain(destination)) {
    const polkadot = await PolkadotService.create(destination);
    const cfg = (fee as FeeConfigBuilder).build({
      address,
      api: polkadot.api,
      asset: destination.getChainAsset(asset),
      destination,
      feeAsset: destination.getChainAsset(feeAsset),
    });

    return zero.copyWith({
      amount: await cfg.call(),
    });
  }

  return zero;
}

export interface ConvertToChainDecimalsParams {
  asset: AssetAmount;
  target: ChainAsset;
}

export function convertToChainDecimals({
  asset,
  target,
}: ConvertToChainDecimalsParams): AssetAmount {
  return AssetAmount.fromChainAsset(target, {
    amount: asset.convertDecimals(target.decimals).amount,
  });
}

export async function getExistentialDeposit(
  chain: AnyChain,
): Promise<AssetAmount | undefined> {
  if (EvmParachain.isAnyParachain(chain)) {
    const polkadot = await PolkadotService.create(chain);

    return polkadot.existentialDeposit;
  }

  return undefined;
}

export interface GetDestinationFeeBalanceParams {
  balance: AssetAmount;
  feeBalance: AssetAmount;
  route: AssetRoute;
  sourceAddress: string;
}

export async function getDestinationFeeBalance({
  balance,
  feeBalance,
  route,
  sourceAddress,
}: GetDestinationFeeBalanceParams): Promise<AssetAmount> {
  if (route.destination.fee.asset.isEqual(balance)) {
    return balance;
  }

  if (route.destination.fee.asset.isEqual(feeBalance)) {
    return feeBalance;
  }

  if (!route.source.destinationFee?.balance) {
    throw new Error(
      'BalanceBuilder must be defined for source.destinationFee.balance for AssetRoute',
    );
  }

  return getBalance({
    address: sourceAddress,
    asset: route.getDestinationFeeAssetOnSource(),
    builder: route.source.destinationFee?.balance,
    chain: route.source.chain,
  });
}

export interface GetExtrinsicFeeParams {
  address: string;
  balance: AssetAmount;
  chain: AnyParachain;
  extrinsic: ExtrinsicConfig;
  feeBalance: AssetAmount;
  feeConfig?: FeeConfig;
}

export async function getExtrinsicFee({
  address,
  balance,
  chain,
  extrinsic,
  feeBalance,
  feeConfig,
}: GetExtrinsicFeeParams): Promise<AssetAmount> {
  /**
   * If account has no balance (account doesn't exist),
   * we can't get the fee from some chains.
   * Example: Phala - PHA
   */
  try {
    const polkadot = await PolkadotService.create(chain);
    const fee = await polkadot.getFee(address, extrinsic);
    const extra = feeConfig?.extra
      ? toBigInt(feeConfig.extra, feeBalance.decimals)
      : 0n;
    const totalFee = fee + extra;

    const converted = chain.usesChainDecimals
      ? convertDecimals(totalFee, polkadot.decimals, feeBalance.decimals)
      : totalFee;

    return feeBalance.copyWith({ amount: converted });
  } catch (error) {
    if (balance.amount) {
      throw error;
    }

    return feeBalance.copyWith({ amount: 0n });
  }
}

export interface GetContractFeeParams {
  address: string;
  balance: AssetAmount;
  chain: EvmChain | EvmParachain;
  contract: ContractConfig;
  destinationFee: AssetAmount;
  feeBalance: AssetAmount;
  feeConfig?: FeeConfig;
}

export async function getContractFee({
  address,
  balance,
  chain,
  contract,
  destinationFee,
  feeBalance,
  feeConfig,
}: GetContractFeeParams): Promise<AssetAmount> {
  try {
    if (balance.amount === 0n) {
      return feeBalance.copyWith({ amount: 0n });
    }
    const evm = EvmService.create(chain);
    const fee = await evm.getFee(address, contract);
    const extra = feeConfig?.extra
      ? toBigInt(feeConfig.extra, feeBalance.decimals)
      : 0n;

    return feeBalance.copyWith({ amount: fee + extra });
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

interface ValidateSovereignAccountBalancesProps {
  amount: bigint;
  destinationData: DestinationChainTransferData;
  sourceData: SourceChainTransferData;
}

export function validateSovereignAccountBalances({
  amount,
  sourceData,
  destinationData,
}: ValidateSovereignAccountBalancesProps): void {
  if (
    !Parachain.is(destinationData.chain) ||
    !destinationData.chain.checkSovereignAccountBalances ||
    !destinationData.sovereignAccountBalances
  ) {
    return;
  }
  const { feeAssetBalance, transferAssetBalance } =
    destinationData.sovereignAccountBalances;

  if (amount > transferAssetBalance) {
    throw new Error(
      `${sourceData.chain.name} Sovereign account in ${destinationData.chain.name} does not have enough balance for this transaction`,
    );
  }
  if (feeAssetBalance && sourceData.destinationFee.amount > feeAssetBalance) {
    throw new Error(
      `${sourceData.chain.name} Sovereign account in ${destinationData.chain.name} does not have enough balance to pay for fees for this transaction`,
    );
  }
}
