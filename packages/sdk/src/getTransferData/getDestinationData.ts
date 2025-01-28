import type {
  AssetRoute,
  DestinationConfig,
  SourceConfig,
} from '@moonbeam-network/xcm-config';
import { Parachain } from '@moonbeam-network/xcm-types';
import { getSovereignAccountAddresses } from '@moonbeam-network/xcm-utils';
import type { DestinationChainTransferData } from '../sdk.interfaces';
import {
  getAssetMin,
  getBalance,
  getDestinationFee,
  getExistentialDeposit,
} from './getTransferData.utils';

export interface GetDestinationDataParams {
  route: AssetRoute;
  destinationAddress: string;
}

export async function getDestinationData({
  route,
  destinationAddress,
}: GetDestinationDataParams): Promise<DestinationChainTransferData> {
  const destination = route.destination.chain;
  const asset = destination.getChainAsset(route.destination.asset);
  const balance = await getBalance({
    address: destinationAddress,
    asset,
    builder: route.destination.balance,
    chain: destination,
  });
  const min = await getAssetMin({
    asset,
    builder: route.destination.min,
    chain: destination,
  });
  const fee = await getDestinationFee({
    address: destinationAddress,
    feeAsset: route.destination.fee.asset,
    destination,
    fee: route.destination.fee.amount,
    asset: route.source.asset,
  });
  const existentialDeposit = await getExistentialDeposit(destination);

  return {
    chain: destination,
    balance,
    existentialDeposit,
    fee,
    min,
    sovereignAccountBalances: await getSovereignAccountBalances({
      source: route.source,
      destination: route.destination,
    }),
  };
}

interface GetSovereignAccountBalancesProps {
  source: SourceConfig;
  destination: DestinationConfig;
}

async function getSovereignAccountBalances({
  destination,
  source,
}: GetSovereignAccountBalancesProps) {
  if (
    !Parachain.is(source.chain) ||
    !Parachain.is(destination.chain) ||
    !destination.chain.checkSovereignAccountBalances
  ) {
    return undefined;
  }

  const sovereignAccountAddresses = getSovereignAccountAddresses(
    source.chain.parachainId,
  );

  const destinationFeeAssetBalance = destination.fee.balance;

  const sovereignAccountAddress = destination.chain.isRelay
    ? sovereignAccountAddresses.relay
    : sovereignAccountAddresses.generic;

  const sovereignAccountBalance = await getBalance({
    address: sovereignAccountAddress,
    asset: destination.chain.getChainAsset(destination.asset),
    builder: destination.balance,
    chain: destination.chain,
  });

  const sovereignAccountFeeAssetBalance = destinationFeeAssetBalance
    ? await getBalance({
        address: sovereignAccountAddress,
        asset: destination.chain.getChainAsset(destination.fee.asset),
        builder: destinationFeeAssetBalance,
        chain: destination.chain,
      })
    : undefined;
  return {
    feeAssetBalance: sovereignAccountFeeAssetBalance?.amount,
    transferAssetBalance: sovereignAccountBalance.amount,
  };
}
