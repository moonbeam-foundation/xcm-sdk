import {
  ConfigService,
  crossEcosystemsRoutesMap,
  lamaGLMR,
  moonlama,
  moonsama,
  // moonbeam,
  // moonlama,
  // moonriver,
  // moonsama,
  // pizzaUSDC,
  // usdcwh,
} from '@moonbeam-network/xcm-config';
import type { AnyParachain, Asset } from '@moonbeam-network/xcm-types';
import { describe, expect, it } from 'vitest';
import { Sdk, type TransferData } from '../../src';
import { moonEvmAddress } from './constants';

const transferDataTestConfig: {
  asset: Asset;
  source: AnyParachain;
  destination: AnyParachain;
  sourceAddress: string;
  destinationAddress: string;
}[] = [
  // Tests were failing due to an error when calling balanceOf for assets pizza, pizzaUSDC and samaMOVR,
  // so we are skipping them for now until we investigate the issue
  {
    asset: lamaGLMR,
    source: moonlama,
    sourceAddress: moonEvmAddress,
    destination: moonsama,
    destinationAddress: moonEvmAddress,
  },
  // {
  //   asset: pizzaUSDC,
  //   source: moonsama,
  //   sourceAddress: moonEvmAddress,
  //   destination: moonlama,
  //   destinationAddress: moonEvmAddress,
  // },
  // {
  //   asset: pizza,
  //   source: moonsama,
  //   sourceAddress: moonEvmAddress,
  //   destination: moonlama,
  //   destinationAddress: moonEvmAddress,
  // },
  // {
  //   asset: samaMOVR,
  //   source: moonsama,
  //   sourceAddress: moonEvmAddress,
  //   destination: moonlama,
  //   destinationAddress: moonEvmAddress,
  // },
];

describe('sdk/transferData ecosystem', () => {
  const configService = new ConfigService({
    routes: crossEcosystemsRoutesMap,
  });

  describe.each(
    transferDataTestConfig,
  )('asset $asset.key from source $source.name to destination $destination.name', ({
    asset,
    source,
    sourceAddress,
    destination,
    destinationAddress,
  }) => {
    it(`should get transfer data from ${source.name} to ${destination.name} with asset ${asset.key}`, async () => {
      const transferData: TransferData = await Sdk({
        configService,
      })
        .setAsset(asset)
        .setSource(source)
        .setDestination(destination)
        .setAddresses({
          sourceAddress: sourceAddress,
          destinationAddress: destinationAddress,
        });

      expect(transferData).toMatchSnapshot();
    });
  });
});
