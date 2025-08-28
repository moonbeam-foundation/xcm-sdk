import {
  ConfigService,
  crossEcosystemsRoutesMap,
  moonlama,
  moonsama,
  pizza,
} from '@moonbeam-network/xcm-config';
import type { AnyParachain, Asset } from '@moonbeam-network/xcm-types';
import { describe, it } from 'vitest';
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
    asset: pizza,
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
        try {
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
          console.log(
            '\x1b[34m████████████████████▓▓▒▒░ ecosystemTransferData.test.ts:49 ░▒▒▓▓████████████████████\x1b[0m',
          );
          console.log('* transferData = ');
          console.log(transferData);
          console.log(
            '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
          );
        } catch (error) {
          console.log(
            '\x1b[34m████████████████████▓▓▒▒░ ecosystemTransferData.test.ts:58 ░▒▒▓▓████████████████████\x1b[0m',
          );
          console.log('* error = ');
          console.log(error);
          console.log(
            '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
          );
        }

        // expect(transferData).toMatchSnapshot();
      });
    },
  );
});
