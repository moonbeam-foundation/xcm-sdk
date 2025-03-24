export function isHexString(asset: unknown): boolean {
  return typeof asset === 'string' && asset.startsWith('0x');
}

export function isEthAddress(address: string): boolean {
  return address.length === 42 && address.startsWith('0x');
}
