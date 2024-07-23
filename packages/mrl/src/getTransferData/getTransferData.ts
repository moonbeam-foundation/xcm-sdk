import { AssetRoute } from '@moonbeam-network/xcm-config';

// TODO: remove
/* eslint-disable @typescript-eslint/no-unused-vars */
export interface GetTransferDataParams {
  route: AssetRoute;
  destinationAddress: string;
  sourceAddress: string;
}

export async function getTransferData({
  route,
  destinationAddress,
  sourceAddress,
}: GetTransferDataParams) {
  return {};
}
