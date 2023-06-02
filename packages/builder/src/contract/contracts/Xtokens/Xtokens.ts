/* eslint-disable @typescript-eslint/no-use-before-define */
import { AnyChain } from '@moonbeam-network/xcm-types';
import { formatAssetIdToERC20 } from '@moonbeam-network/xcm-utils';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { ContractConfigBuilder } from '../../ContractBuilder.interfaces';
import { ContractConfig } from '../../ContractConfig';

export function Xtokens() {
  return {
    transfer: (weight = 4_000_000_000): ContractConfigBuilder => ({
      build: ({ address, amount, asset, destination }) => {
        const erc20 =
          typeof asset === 'string' && asset.startsWith('0x')
            ? asset
            : formatAssetIdToERC20(asset as string);

        return new ContractConfig({
          args: [
            erc20,
            amount,
            getDestinationMultilocation(address, destination),
            weight,
          ],
          func: 'transfer',
          module: 'Xtokens',
        });
      },
    }),
    transferMultiCurrencies: (
      weight = 4_000_000_000,
    ): ContractConfigBuilder => ({
      build: ({ address, amount, asset, destination, fee, feeAsset }) => {
        const erc20 =
          typeof asset === 'string' && asset.startsWith('0x')
            ? asset
            : formatAssetIdToERC20(asset as string);
        const feeErc20 =
          typeof feeAsset === 'string' && feeAsset.startsWith('0x')
            ? feeAsset
            : formatAssetIdToERC20(feeAsset as string);

        return new ContractConfig({
          args: [
            [
              [erc20, amount],
              [feeErc20, fee],
            ],
            1, // index of the fee asset
            getDestinationMultilocation(address, destination),
            weight,
          ],
          func: 'transferMultiCurrencies',
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
