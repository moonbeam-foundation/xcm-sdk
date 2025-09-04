import type { AnyParachain } from '@moonbeam-network/xcm-types';
import { formatAssetIdToERC20 } from '@moonbeam-network/xcm-utils';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress, evmToAddress } from '@polkadot/util-crypto';
import { ContractConfig } from '../../../types/evm/ContractConfig';
import type {
  ContractConfigBuilder,
  DestinationMultilocation,
} from '../../ContractBuilder.interfaces';
import { getDestinationMultilocation } from '../../ContractBuilder.utils';
import { XTOKENS_ABI } from './XtokensABI';

const U_64_MAX = 18446744073709551615n;
const XTOKENS_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000804';

export function Xtokens() {
  return {
    transfer: (weight = U_64_MAX): ContractConfigBuilder => ({
      build: ({ destinationAddress, asset, destination }) =>
        new ContractConfig({
          address: XTOKENS_CONTRACT_ADDRESS,
          abi: XTOKENS_ABI,
          args: [
            asset.address
              ? formatAssetIdToERC20(asset.address)
              : asset.getAssetId(),
            asset.amount,
            getDestinationMultilocation(destinationAddress, destination),
            weight,
          ],
          func: 'transfer',
          module: 'Xtokens',
        }),
    }),
    transferMultiCurrencies: (
      shouldTransferAssetPrecedeFeeAsset = true,
      weight = U_64_MAX,
    ): ContractConfigBuilder => ({
      build: ({ asset, destination, destinationAddress, fee }) => {
        const transferAsset = [
          asset.address
            ? formatAssetIdToERC20(asset.address)
            : asset.getAssetId(),
          asset.amount,
        ];

        const feeAsset = [
          fee.address ? formatAssetIdToERC20(fee.address) : fee.getAssetId(),
          fee.amount,
        ];

        const assets = shouldTransferAssetPrecedeFeeAsset
          ? [transferAsset, feeAsset]
          : [feeAsset, transferAsset];
        const feeAssetIndex = shouldTransferAssetPrecedeFeeAsset ? 1 : 0;
        return new ContractConfig({
          address: XTOKENS_CONTRACT_ADDRESS,
          abi: XTOKENS_ABI,
          args: [
            assets,
            feeAssetIndex,
            getDestinationMultilocation(destinationAddress, destination),
            weight,
          ],
          func: 'transferMultiCurrencies',
          module: 'Xtokens',
        });
      },
    }),
    transferWithEvmTo32: (weight = U_64_MAX): ContractConfigBuilder => ({
      build: ({ destinationAddress, asset, destination }) => {
        const multilocation =
          getDestinationMultilocationForPrecompileDestination(
            destinationAddress,
            destination,
          );

        return new ContractConfig({
          address: XTOKENS_CONTRACT_ADDRESS,
          abi: XTOKENS_ABI,
          args: [
            asset.address
              ? formatAssetIdToERC20(asset.address)
              : asset.getAssetId(),
            asset.amount,
            multilocation,
            weight,
          ],
          func: 'transfer',
          module: 'Xtokens',
        });
      },
    }),
  };
}

function getDestinationMultilocationForPrecompileDestination(
  address: string,
  destination: AnyParachain,
): DestinationMultilocation {
  /* 
   01: AccountId32
   03: AccountKey20
   https://docs.moonbeam.network/builders/interoperability/xcm/xc20/xtokens/#building-the-precompile-multilocation
   */
  const accountType = '01';
  const substrateAddress = evmToAddress(address);
  const acc = `0x${accountType}${u8aToHex(
    decodeAddress(substrateAddress),
    -1,
    false,
  )}00`;

  return [
    1,
    destination.parachainId
      ? [`0x0000000${destination.parachainId.toString(16)}`, acc]
      : [acc],
  ];
}
