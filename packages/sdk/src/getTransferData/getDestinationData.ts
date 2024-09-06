import { AssetRoute } from '@moonbeam-network/xcm-config';
import { DestinationChainTransferData } from '../sdk.interfaces';
import {
  getBalance,
  getDestinationFee,
  getExistentialDeposit,
  getAssetMin,
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
  const asset = destination.getChainAsset(route.asset);
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
    asset: route.destination.fee.asset,
    chain: destination,
    fee: route.destination.fee.amount,
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
