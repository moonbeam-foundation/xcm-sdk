import {
  AnyChain,
  Asset,
  EvmParachain,
  EvmParachainConstructorParams,
  Parachain,
  ParachainConstructorParams,
} from '@moonbeam-network/xcm-types';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { ConfigService } from './ConfigService';

export class MutableConfigService extends ConfigService {
  updateAssets(asset: Asset): void {
    this.assets.set(asset.key, asset);
  }

  updateChains(chain: AnyChain): void {
    this.chains.set(chain.key, chain);
  }

  updateChain(chain: AnyChain, chainDelta: Partial<AnyChain>): void {
    const args = {
      ...chain,
      ...chainDelta,
    };
    const updated: AnyChain = chain.isEvmParachain()
      ? new EvmParachain(args as EvmParachainConstructorParams)
      : new Parachain(args as ParachainConstructorParams);
    this.chains.set(updated.key, updated);
  }

  updateChainConfig(chainConfig: ChainConfig): void {
    this.chainsConfig.set(chainConfig.chain.key, chainConfig);
  }

  updateAssetConfig(chain: AnyChain, assetConfig: AssetConfig): void {
    const chainConfig = this.getChainConfig(chain);
    const assetsConfig = chainConfig.getAssetsConfigs();
    const isExisting: (chain: AssetConfig) => boolean = ({
      asset,
      destination,
    }) =>
      asset === assetConfig.asset && destination === assetConfig.destination;

    const updatedAssetsConfig: AssetConfig[] = assetsConfig
      .filter((config) => !isExisting(config))
      .concat(assetConfig);

    const updatedConfig = new ChainConfig({
      ...chainConfig,
      assets: updatedAssetsConfig,
    });
    this.chainsConfig.set(chainConfig.chain.key, updatedConfig);
  }
}
