import {
  type AssetAmount,
  type ChainAsset,
  EvmParachain,
  type Parachain,
} from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { _0n } from '@polkadot/util';
import { evmToAddress } from '@polkadot/util-crypto';
import { type Address, encodeFunctionData, maxUint64 } from 'viem';
import { getPrecompileDestinationInterior } from '../../../../../builder.utils';
import { ContractConfig } from '../../../../../contract';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';
import {
  CROSS_CHAIN_FEE,
  buildSendExtrinsic,
} from '../../extrinsic/polkadotXcm/polkadotXcm';
import { getAbisForChain } from './abi/abi.helpers';

const module = 'Batch';

export function Batch() {
  return {
    transferAssetsAndMessage: (): MrlConfigBuilder => ({
      build: ({
        asset,
        destination,
        destinationAddress,
        fee,
        isAutomatic,
        moonAsset,
        moonChain,
        moonApi,
        source,
        sourceAddress,
        sourceApi,
        transact,
      }) => {
        if (!EvmParachain.is(source)) {
          throw new Error('Source chain needs to be an EVMParachain');
        }

        if (!sourceApi) {
          throw new Error('Source API needs to be defined');
        }

        if (
          !source.contracts?.Xtokens ||
          !source.contracts?.XcmUtils ||
          !source.contracts?.Batch
        ) {
          throw new Error(
            'Source chain needs to have the Xtokens, XcmUtils and Batch contract addresses configured',
          );
        }

        const subMappedAddress = evmToAddress(sourceAddress);

        const { BatchAbi, XcmUtilsAbi, XtokensAbi } = getAbisForChain(source);

        const { address20: computedOriginAccount } =
          getMultilocationDerivedAddresses({
            address: subMappedAddress,
            paraId: source.parachainId,
            isParents: true,
          });

        const send = buildSendExtrinsic({
          asset,
          destination,
          destinationAddress,
          computedOriginAccount,
          fee,
          isAutomatic,
          moonAsset,
          moonChain,
          moonApi,
          source,
          sourceAddress,
          sourceApi,
          transact,
        });
        // we keep only the message
        const encodedXcmMessage = send.args[1].toHex();

        const { destinationParachain, destinationParachainAndAddress } =
          getDestinationInHex(moonChain, computedOriginAccount);

        const { currencies, feeItem } = getCurrencies({
          source,
          moonAsset,
          asset,
        });
        const weight = maxUint64;

        const multiTransferTxData = encodeFunctionData({
          abi: XtokensAbi,
          functionName: 'transferMultiCurrencies',
          args: [currencies, feeItem, destinationParachainAndAddress, weight],
        });

        const xcmSendTxData = encodeFunctionData({
          abi: XcmUtilsAbi,
          functionName: 'xcmSend',
          args: [destinationParachain, encodedXcmMessage],
        });

        return new ContractConfig({
          address: source.contracts.Batch,
          abi: BatchAbi,
          args: [
            [source.contracts.Xtokens, source.contracts.XcmUtils],
            [],
            [multiTransferTxData, xcmSendTxData],
            [],
          ],
          func: 'batchAll',
          module,
        });
      },
    }),
  };
}

function getDestinationInHex(
  moonChain: EvmParachain,
  computedOriginAccount: string,
) {
  const destinationParachain = {
    parents: 1,
    interior: getPrecompileDestinationInterior(moonChain),
  } as const;

  const destinationParachainAndAddress = {
    parents: 1,
    interior: getPrecompileDestinationInterior(
      moonChain,
      computedOriginAccount,
    ),
  } as const;

  return {
    destinationParachain,
    destinationParachainAndAddress,
  };
}

interface GetCurrenciesParams {
  source: Parachain | EvmParachain;
  moonAsset: ChainAsset;
  asset: AssetAmount;
}

function getCurrencies({ source, moonAsset, asset }: GetCurrenciesParams) {
  const currencies = [
    {
      currencyAddress: source.getChainAsset(moonAsset).address as Address,
      amount: CROSS_CHAIN_FEE,
    },
    {
      currencyAddress: asset.address as Address,
      amount: asset.amount,
    },
  ];
  const feeItem = 0; // moonAsset
  return { currencies, feeItem };
}
