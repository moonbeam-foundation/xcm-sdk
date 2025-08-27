import {
  ConfigService,
  crossEcosystemsRoutesMap,
  lama,
  moonlama,
  moonsama,
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
    asset: lama,
    source: moonlama,
    sourceAddress: moonEvmAddress,
    destination: moonsama,
    destinationAddress: moonEvmAddress,
  },
];

describe('sdk/transferData ecosystem', () => {
  const configService = new ConfigService({
    routes: crossEcosystemsRoutesMap,
  });

  describe.each(transferDateTestConfig)(
    'asset $asset.key from source $source.name to destination $destination.name',
    ({ asset, source, sourceAddress, destination, destinationAddress }) => {
      it('should get expected balances', async () => {
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
    },
  );
});
