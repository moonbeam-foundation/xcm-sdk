/* eslint-disable @typescript-eslint/no-use-before-define */
import { FeeConfigBuilder } from '@moonbeam-network/xcm-builder';
import { TransferConfig } from '@moonbeam-network/xcm-config';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import {
  getSovereignAccountAddresses,
  toBigInt,
} from '@moonbeam-network/xcm-utils';
import { PolkadotService } from '../polkadot';
import { DestinationChainTransferData } from '../sdk.interfaces';
import { getBalance, getDecimals, getMin } from './getTransferData.utils';

export interface GetDestinationDataParams {
  transferConfig: TransferConfig;
  destinationAddress: string;
  polkadot: PolkadotService;
}

export async function getDestinationData({
  transferConfig,
  destinationAddress,
  polkadot,
}: GetDestinationDataParams): Promise<DestinationChainTransferData> {
  const {
    asset,
    destination: { chain, config },
  } = transferConfig;

  const zeroAmount = AssetAmount.fromAsset(asset, {
    amount: 0n,
    decimals: await getDecimals({
      address: destinationAddress,
      chain,
      config,
      polkadot,
    }),
  });

  const balance = await getBalance({
    address: destinationAddress,
    asset: config.asset,
    balanceBuilder: config.balance,
    chain,
    decimals: zeroAmount.decimals,
    polkadot,
  });

  const min = await getMin(config, polkadot);

  const balanceAmount = zeroAmount.copyWith({ amount: balance });
  const { existentialDeposit } = polkadot;

  const feeAmount = await getFee({
    address: destinationAddress,
    config: transferConfig,
    polkadot,
  });
  const minAmount = zeroAmount.copyWith({ amount: min });

  return {
    balance: balanceAmount,
    chain,
    existentialDeposit,
    fee: feeAmount,
    min: minAmount,
    sovereignAccountBalances: chain.checkSovereignAccountBalances
      ? await getSovereignAccountBalances({
          decimals: zeroAmount.decimals,
          polkadot,
          transferConfig,
        })
      : undefined,
  };
}

export interface GetFeeParams {
  address: string;
  config: TransferConfig;
  polkadot: PolkadotService;
}

export async function getFee({
  config,
  polkadot,
}: GetFeeParams): Promise<AssetAmount> {
  const { amount, asset } = config.source.config.destinationFee;
  // TODO we have to consider correctly here when an asset is ERC20 to get it from contract
  const decimals = await polkadot.getAssetDecimals(asset);
  const zeroAmount = AssetAmount.fromAsset(asset, {
    amount: 0n,
    decimals,
  });

  if (Number.isFinite(amount)) {
    return zeroAmount.copyWith({
      amount: toBigInt(amount as number, decimals),
    });
  }

  const cfg = (amount as FeeConfigBuilder).build({
    api: polkadot.api,
    asset: polkadot.chain.getAssetId(asset),
  });

  return zeroAmount.copyWith({
    amount: await cfg.call(),
  });
}

interface GetSovereignAccountBalancesProps {
  transferConfig: TransferConfig;
  decimals: number;
  polkadot: PolkadotService;
}

async function getSovereignAccountBalances({
  transferConfig,
  decimals,
  polkadot,
}: GetSovereignAccountBalancesProps) {
  const {
    destination: { chain, config },
    source: { config: sourceConfig },
  } = transferConfig;
  const sovereignAccountAddresses = getSovereignAccountAddresses(
    transferConfig.source.chain.parachainId,
  );

  const destinationFeeAssetBalance =
    sourceConfig.destinationFee?.destinationBalance;

  const sovereignAccountAddress = chain.isRelay
    ? sovereignAccountAddresses.relay
    : sovereignAccountAddresses.generic;

  const sovereignAccountBalance = await getBalance({
    address: sovereignAccountAddress,
    asset: config.asset,
    balanceBuilder: config.balance,
    chain,
    decimals,
    polkadot,
  });

  const sovereignAccountFeeAssetBalance = destinationFeeAssetBalance
    ? await getBalance({
        address: sovereignAccountAddress,
        asset: sourceConfig.destinationFee.asset,
        balanceBuilder: destinationFeeAssetBalance,
        chain,
        decimals, // TODO this is not correct but will only affect us if a chain has both checkSovereignAccountBalances and usesChainDecimals flags
        polkadot,
      })
    : undefined;
  return {
    feeAssetBalance: sovereignAccountFeeAssetBalance,
    transferAssetBalance: sovereignAccountBalance,
  };
}
