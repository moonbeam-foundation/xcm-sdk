import { Asset } from '../../asset';

export type ChainAssetId =
  | string
  | number
  | bigint
  | { [key: string]: string | number | bigint };

export interface ChainAssetsData {
  decimals?: number;
  id?: ChainAssetId;
  balanceId?: ChainAssetId;
  palletInstance?: number;
}

export interface ChainAssetsDataWithAsset extends ChainAssetsData {
  asset: Asset;
}
