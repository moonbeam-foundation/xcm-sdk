export function getPolkadotAppsUrl(ws: string) {
  return `https://polkadot.js.org/apps/?rpc=${encodeURIComponent(ws)}#/explorer/query`;
}
