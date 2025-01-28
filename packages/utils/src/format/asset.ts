export function formatAssetIdToERC20(id: string) {
  if (id.startsWith('0x')) {
    return id;
  }

  if (!/^\d{38,39}$/.test(id)) {
    throw new Error(`Asset id: ${id} must be a string and have 38-39 digits`);
  }

  return `0xffffffff${BigInt(id).toString(16).padStart(32, '0')}`;
}

export function convertAddressTo32Bytes(address: string): string {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`Invalid address: ${address}`);
  }

  return `0x000000000000000000000000${address.substring(2)}`;
}
