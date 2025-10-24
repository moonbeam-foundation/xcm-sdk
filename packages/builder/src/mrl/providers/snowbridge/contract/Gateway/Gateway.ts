import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { ContractConfig } from '../../../../../contract';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';
import { GATEWAY_ABI } from './GatewayAbi';

const module = 'Gateway';

// TODO mjm move this to constants file in snowbridge or in mrl builder
const ASSET_HUB_PARA_ID = 1;
export const GATEWAY_CONTRACT_ADDRESS =
  '0x503B4D684074888EB7fe82D4c5AB25E57de0e85c';

export function Gateway() {
  return {
    sendToken: (): MrlConfigBuilder => ({
      build: ({ asset, destinationAddress, fee }) => {
        const value = fee.isSame(asset)
          ? asset.amount + fee.amount
          : fee.amount;
        console.log('msgValue', value);
        console.log('asset amount', asset);
        console.log(
          `if ${fee.isSame(asset)}, adding fee amount ${fee.amount} to asset amount ${asset.amount}`,
        );
        console.log('asset address', asset.address);
        console.log('destinationAddress', destinationAddress);
        console.log(
          'u8aToHex(decodeAddress(destinationAddress))',
          u8aToHex(decodeAddress(destinationAddress)),
        );

        const args = [
          asset.address,
          ASSET_HUB_PARA_ID,
          {
            kind: 1,
            data: u8aToHex(decodeAddress(destinationAddress)),
          },
          0n,
          asset.amount,
        ];

        return new ContractConfig({
          address: GATEWAY_CONTRACT_ADDRESS,
          abi: GATEWAY_ABI,
          args,
          func: 'sendToken',
          value,
          module,
        });
      },
    }),
  };
}
