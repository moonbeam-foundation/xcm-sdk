export function isHexString(asset: unknown): boolean {
  return typeof asset === 'string' && asset.startsWith('0x');
}
