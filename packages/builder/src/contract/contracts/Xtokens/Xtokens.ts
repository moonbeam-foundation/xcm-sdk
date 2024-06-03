/* eslint-disable @typescript-eslint/no-use-before-define */
import { AnyChain } from '@moonbeam-network/xcm-types';
import { formatAssetIdToERC20 } from '@moonbeam-network/xcm-utils';
import { isString, u8aToHex } from '@polkadot/util';
import { decodeAddress, evmToAddress } from '@polkadot/util-crypto';
import { ContractConfigBuilder } from '../../ContractBuilder.interfaces';
import { ContractConfig } from '../../ContractConfig';

const U_64_MAX = 18446744073709551615n;

export function Xtokens() {
  return {
    transfer: (weight = U_64_MAX): ContractConfigBuilder => ({
      build: ({ address, amount, asset, destination }) =>
        new ContractConfig({
          args: [
            isString(asset) ? formatAssetIdToERC20(asset) : asset,
            amount,
            getDestinationMultilocation(address, destination),
            weight,
          ],
          func: 'transfer',
          module: 'Xtokens',
        }),
    }),
    transferMultiCurrencies: (weight = U_64_MAX): ContractConfigBuilder => ({
      build: ({ address, amount, asset, destination, fee, feeAsset }) =>
        new ContractConfig({
          args: [
            [
              [isString(asset) ? formatAssetIdToERC20(asset) : asset, amount],
              [
                isString(feeAsset) ? formatAssetIdToERC20(feeAsset) : feeAsset,
                fee,
              ],
            ],
            1, // index of the fee asset
            getDestinationMultilocation(address, destination),
            weight,
          ],
          func: 'transferMultiCurrencies',
          module: 'Xtokens',
        }),
    }),
    transferWithEvmTo32: (weight = U_64_MAX): ContractConfigBuilder => ({
      build: ({ address, amount, asset, destination }) => {
        const multilocation =
          getDestinationMultilocationForPrecompileDestination(
            address,
            destination,
          );

        return new ContractConfig({
          args: [
            isString(asset) ? formatAssetIdToERC20(asset) : asset,
            amount,
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

type DestinationMultilocation = [
  /**
   * 1 - if transaction is going through a relay chain
   */
  1,
  (
    | [
        /**
         * example '0x00000007DC'
         * 7DC - parachain id in hex
         * can be found here:
         *   - https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.polkadot.io#/parachains
         *   - https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/parachains
         */
        string,
        /**
         * example '0x01%account%00',
         * enum = 01 (AccountId32)
         * networkId = 00 (any)
         */
        string,
      ]
    | [
        /**
         * example '0x01%account%00',
         * enum = 01 (AccountId32)
         * networkId = 00 (any)
         */
        string,
      ]
  ),
];

function getDestinationMultilocationForPrecompileDestination(
  address: string,
  destination: AnyChain,
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

function getDestinationMultilocation(
  address: string,
  destination: AnyChain,
): DestinationMultilocation {
  /* 
   01: AccountId32
   03: AccountKey20
   https://docs.moonbeam.network/builders/interoperability/xcm/xc20/xtokens/#building-the-precompile-multilocation
   */
  const accountType = destination.isEvmParachain() ? '03' : '01';
  const acc = `0x${accountType}${u8aToHex(
    decodeAddress(address),
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
