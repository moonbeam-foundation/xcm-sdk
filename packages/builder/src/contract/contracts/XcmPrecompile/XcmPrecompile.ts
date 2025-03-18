import { ContractConfig } from '../../../types';
import type { ContractConfigBuilder } from '../../ContractBuilder.interfaces';
import { XCM_ABI } from './XcmPrecompileAbi';

const XCM_PRECOMPILE_ADDRESS = '0x000000000000000000000000000000000000081A';

export function XcmPrecompile() {
  return {
    transferAssetsToPara20: (): ContractConfigBuilder => ({
      build: ({ destinationAddress, asset, destination }) => {
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
  };
}
