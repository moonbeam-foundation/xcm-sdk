import { AssetRoute } from '@moonbeam-network/xcm-config';
import { AnyChain } from '@moonbeam-network/xcm-types';
import { TransferData } from '../mrl.interfaces';

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
  return {};
}
