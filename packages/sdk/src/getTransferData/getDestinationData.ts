import type { AssetRoute } from '@moonbeam-network/xcm-config';
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
    asset: route.destination.fee.asset,
    destination,
    fee: route.destination.fee.amount,
    transferAsset: route.source.asset,
  });
  const existentialDeposit = await getExistentialDeposit(destination);

  return {
    chain: destination,
    balance,
    existentialDeposit,
    fee,
    min,
  };
}
