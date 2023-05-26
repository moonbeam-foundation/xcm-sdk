export function formatAssetIdToERC20(asset: string) {
  if (typeof asset !== 'string' || !/^\d{38}$/.test(asset)) {
    throw new Error('Asset id must be a string and have 38 digits');
  }

  return `0xffffffff${BigInt(asset).toString(16).padStart(32, '0')}`;
}
