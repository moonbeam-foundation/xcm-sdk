import { AssetRoute } from '@moonbeam-network/xcm-config';
import { AnyChain } from '@moonbeam-network/xcm-types';
import { TransferData } from '../mrl.interfaces';
import { getDestinationData } from './getDestinationData';

export interface GetTransferDataParams {
  route: AssetRoute;
  destinationAddress: string;
  sourceAddress: string;
  source: AnyChain;
}

// TODO: remove
/* eslint-disable @typescript-eslint/no-unused-vars */
export async function getTransferData({
  route,
  source,
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
