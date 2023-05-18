import { AnyChain, Asset, AssetAmount } from '@moonbeam-network/xcm-types';
import { PolkadotService } from './polkadot';

export interface CreateZeroAssetsParams {
  asset: Asset;
  chain: AnyChain;
  feeAsset?: Asset;
  polkadot: PolkadotService;
}

export async function createZeroAssets({
  asset,
  chain,
  feeAsset,
  polkadot,
}: CreateZeroAssetsParams): Promise<{
  zeroAmount: AssetAmount;
  zeroFeeAmount: AssetAmount;
}> {
  const zeroAmount = AssetAmount.fromAsset(asset, {
    amount: 0n,
    decimals:
      (await polkadot.getAssetMeta(chain.getAssetId(asset)))?.decimals ||
      chain.getAssetDecimals(asset) ||
      polkadot.decimals,
  });
  const zeroFeeAmount = feeAsset
    ? AssetAmount.fromAsset(feeAsset, {
        amount: 0n,
        decimals:
          (await polkadot.getAssetMeta(chain.getAssetId(feeAsset)))?.decimals ||
          chain.getAssetDecimals(feeAsset) ||
          polkadot.decimals,
      })
    : zeroAmount;

  return {
    zeroAmount,
    zeroFeeAmount,
  };
}
