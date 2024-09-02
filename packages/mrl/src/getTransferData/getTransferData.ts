import { AssetRoute } from '@moonbeam-network/xcm-config';
import { TransferData } from '../mrl.interfaces';
import { getDestinationData } from './getDestinationData';

export interface GetTransferDataParams {
  route: AssetRoute;
  sourceAddress: string;
  destinationAddress: string;
}

export async function getTransferData({
  route,
  sourceAddress,
  destinationAddress,
}: GetTransferDataParams): Promise<TransferData> {
  const destinationData = await getDestinationData({
    route,
    destinationAddress,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { destination: destinationData } as any;
}
