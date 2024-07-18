import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { AssetTransferConfig } from '../types/AssetTransferConfig';

export interface IConfigService {
  getEcosystemAssets(ecosystem?: Ecosystem): Asset[];

  getAsset(keyOrAsset: string | Asset): Asset;

  getChain(keyOrAsset: string | AnyChain): AnyChain;

  getSourceChains(asset: Asset, ecosystem: Ecosystem | undefined): AnyChain[];

  getDestinationChains(asset: Asset, source: AnyChain): AnyChain[];

  getAssetDestinationConfig(
    asset: Asset,
    source: AnyChain,
    destination: AnyChain,
  ): AssetTransferConfig;
}
