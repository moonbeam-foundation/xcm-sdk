import { AssetTransferConfig } from '@moonbeam-network/xcm-config';

// TODO: remove
/* eslint-disable @typescript-eslint/no-unused-vars */
export interface GetTransferDataParams {
  config: AssetTransferConfig;
  destinationAddress: string;
  sourceAddress: string;
}

export async function getTransferData({
  config,
  destinationAddress,
  sourceAddress,
}: GetTransferDataParams) {
  return {};
}
