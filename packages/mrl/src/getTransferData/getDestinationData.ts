import type { AssetRoute } from '@moonbeam-network/xcm-config';
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
  const min = await getMin(route, polkadot);
  const fee = await getFee({
    route,
    polkadot,
  });

  return {
    balance,
    fee,
    min,
  };
}
