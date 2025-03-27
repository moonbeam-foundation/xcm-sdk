import { describe, expect, it } from 'vitest';

import {
  alphanetRelay,
  laos,
  laosMainnet,
  moonbaseAlpha,
  moonbeam,
  unit,
} from '@moonbeam-network/xcm-config';
import type { AnyParachain, Asset } from '@moonbeam-network/xcm-types';
import { Sdk, type TransferData } from '../../src';
import {
  laosMainnetAddress,
  moonEvmAddress,
  substrateAddress,
} from './constants';

const transferDateTestConfig: {
  asset: Asset;
  source: AnyParachain;
  destination: AnyParachain;
  sourceAddress: string;
  destinationAddress: string;
}[] = [
  {
    asset: unit,
    source: alphanetRelay,
    sourceAddress: substrateAddress,
    destination: moonbaseAlpha,
    destinationAddress: moonEvmAddress,
  },
  {
    asset: unit,
    source: moonbaseAlpha,
    sourceAddress: moonEvmAddress,
    destination: alphanetRelay,
    destinationAddress: substrateAddress,
  },
  {
    asset: laos,
    source: moonbeam,
    sourceAddress: moonEvmAddress,
    destination: laosMainnet,
    destinationAddress: laosMainnetAddress,
  },
];

describe('sdk/transferData', () => {
  describe.each(transferDateTestConfig)(
    'asset $asset.key from source $source.name to destination $destination.name',
    ({ asset, source, sourceAddress, destination, destinationAddress }) => {
      it('should get expected balances', async () => {
        const transferData: TransferData = await Sdk()
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
