import {
  AssetAmount,
  type ChainAsset,
  EvmParachain,
  type Parachain,
} from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { evmToAddress } from '@polkadot/util-crypto';
import { type Address, encodeFunctionData, maxUint64 } from 'viem';
import { ContractBuilder, ContractConfig } from '../../../../../contract';
import {
  getGlobalConsensusDestination,
  getPrecompileDestinationInterior,
} from '../../../../../contract/ContractBuilder.utils';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';
import {
  buildSendExtrinsic,
  CROSS_CHAIN_FEE,
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
    // TODO mjm integrate this with the xTokens contract
    transferAssetsAndMessageMoonriver: (): MrlConfigBuilder => ({
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

        if (!source.contracts?.XcmUtils || !source.contracts?.Batch) {
          throw new Error(
            'Source chain needs to have the Xtokens, XcmUtils and Batch contract addresses configured',
          );
        }
        console.log('sourceAddress', sourceAddress);

        // const subMappedAddress = evmToAddress(sourceAddress);
        // console.log('subMappedAddress', subMappedAddress);

        const { BatchAbi, XcmUtilsAbi } = getAbisForChain(source);

        const { address20: computedOriginAccount } =
          getMultilocationDerivedAddresses({
            address: sourceAddress,
            paraId: source.parachainId,
            isParents: true,
          });

        console.log('computedOriginAccount', computedOriginAccount);

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
        console.log('send', send.toHuman());
        // we keep only the message
        const encodedXcmMessage = send.args[1].toHex();

        const globalConsensusDestination = getGlobalConsensusDestination(
          sourceApi,
          moonChain,
        );
        // const { currencies, feeItem } = getCurrencies({
        //   source,
        //   moonAsset,
        //   asset,
        // });
        // const weight = maxUint64;

        // const multiTransferTxData = encodeFunctionData({
        //   abi: XtokensAbi,
        //   functionName: 'transferMultiCurrencies',
        //   args: [currencies, feeItem, destinationParachainAndAddress, weight],
        // });
        console.log('sourceAddress', sourceAddress);

        const moonChainFee = AssetAmount.fromChainAsset(
          moonChain.getChainAsset(moonAsset),
          {
            amount: 0.03, // TODO mjm get from the config?
          },
        );
        const transferAssetsCall = ContractBuilder()
          .XcmPrecompile()
          .transferAssetsLocation()
          .foreignErc20()
          .build({
            sourceApi,
            asset,
            fee: moonChainFee,
            destination: moonChain,
            destinationAddress: computedOriginAccount,
            source,
            sourceAddress,
          });

        console.log('transferAssetsCall', transferAssetsCall);

        const transferAssetsCallData = transferAssetsCall.encodeFunctionData();

        console.log('destinationParachain', globalConsensusDestination);

        const xcmSendTxData = encodeFunctionData({
          abi: XcmUtilsAbi,
          functionName: 'xcmSend',
          args: [
            {
              parents: globalConsensusDestination[0],
              interior: globalConsensusDestination[1],
            },
            encodedXcmMessage,
          ],
        });

        return new ContractConfig({
          address: source.contracts.Batch,
          abi: BatchAbi,
          args: [
            [
              '0x000000000000000000000000000000000000081A',
              source.contracts.XcmUtils,
            ],
            [],
            [transferAssetsCallData, xcmSendTxData],
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
