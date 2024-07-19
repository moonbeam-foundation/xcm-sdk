export interface GetTransferDataParams {
  destinationAddress: string;
  sourceAddress: string;
}

export async function getTransferData({
  destinationAddress,
  sourceAddress,
}: GetTransferDataParams) {
  return {};
}
