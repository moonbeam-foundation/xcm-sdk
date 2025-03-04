import { EvmParachain } from '@moonbeam-network/xcm-types';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import type { Address } from 'viem';
import { ContractConfig } from '../../../types';
import type { ContractConfigBuilder } from '../../ContractBuilder.interfaces';
import { XCM_ABI } from './XcmPrecompileAbi';

const XCM_PRECOMPILE_ADDRESS = '0x000000000000000000000000000000000000081A';

export function XcmPrecompile() {
  return {
    transferAssetsToPara20: (): ContractConfigBuilder => ({
      build: ({ destinationAddress, asset, destination }) => {
        console.log('destinationAddress', destinationAddress);
        console.log('asset', asset);
        console.log('destination', destination);
        return new ContractConfig({
          address: XCM_PRECOMPILE_ADDRESS,
          abi: XCM_ABI,
          args: [
            destination.parachainId,
            destinationAddress,
            [[asset.address, asset.amount]],
            0,
          ],
          func: 'transferAssetsToPara20',
          module: 'Xcm',
        });
      },
    }),
    transferAssetsLocation: (): ContractConfigBuilder => ({
      build: ({ destinationAddress, asset, destination }) => {
        const accountType = EvmParachain.is(destination) ? '03' : '01';
        const acc = `0x${accountType}${u8aToHex(
          decodeAddress(destinationAddress),
          -1,
          false,
        )}00` as Address;
        return new ContractConfig({
          address: XCM_PRECOMPILE_ADDRESS,
          abi: XCM_ABI,
          args: [
            [1, []],
            [0, [acc]],
            [[[1, [asset.address]], asset.amount]],
            0,
          ],
          func: 'transferAssetsLocation',
          module: 'Xcm',
        });
      },
    }),
  };
}
