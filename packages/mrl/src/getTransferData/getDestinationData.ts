import type { AssetRoute } from '@moonbeam-network/xcm-config';
import {
  getBalance,
  getDestinationFee,
  getMin,
} from '@moonbeam-network/xcm-sdk';
import type { DestinationTransferData } from '../mrl.interfaces';

export interface GetDestinationDataParams {
  route: AssetRoute;
  destinationAddress: string;
}

export async function getDestinationData({
  route,
  destinationAddress,
}: GetDestinationDataParams): Promise<DestinationTransferData> {
  const asset = route.destination.chain.getChainAsset(route.asset);
  const balance = await getBalance({
    address: destinationAddress,
    asset,
    builder: route.destination.balance,
    chain: route.destination.chain,
  });
  const min = await getMin({
    asset,
    builder: route.destination.min,
    chain: route.destination.chain,
  });
  const fee = await getDestinationFee({
    asset: route.destination.fee.asset,
    chain: route.destination.chain,
    fee: route.destination.fee.amount,
  });

  return {
    balance,
    chain: route.destination.chain,
    fee,
    min,
  };
}
