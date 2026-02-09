import {
  ConfigService,
  crossEcosystemsRoutesMap,
  moonbeam,
  moonriver,
  usdcwh,
  // lamaGLMR,
  // moonlama,
  // moonsama,
  // pizza,
  // pizzaUSDC,
  // samaMOVR,
} from '@moonbeam-network/xcm-config';
import type { AnyParachain, Asset } from '@moonbeam-network/xcm-types';
import { describe, expect, it } from 'vitest';
import { Sdk, type TransferData } from '../../src';
import { moonEvmAddress } from './constants';

const transferDateTestConfig: {
  asset: Asset;
  source: AnyParachain;
  destination: AnyParachain;
  sourceAddress: string;
  destinationAddress: string;
}[] = [
  {
    asset: usdcwh,
    source: moonriver,
    sourceAddress: moonEvmAddress,
    destination: moonbeam,
    destinationAddress: moonEvmAddress,
  },
  {
    asset: usdcwh,
    source: moonbeam,
    sourceAddress: moonEvmAddress,
    destination: moonriver,
    destinationAddress: moonEvmAddress,
  },
  // Tests were failing due to an error when calling balanceOf for asset pizza and the rest of the assets
  // {
  //   asset: lamaGLMR,
  //   source: moonlama,
  //   sourceAddress: moonEvmAddress,
  //   destination: moonsama,
  //   destinationAddress: moonEvmAddress,
  // },
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
    transferDateTestConfig,
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
