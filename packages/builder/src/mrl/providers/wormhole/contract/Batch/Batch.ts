import {
  type AnyChain,
  type AnyParachain,
  type AssetAmount,
  type ChainAsset,
  EvmParachain,
  type Parachain,
} from '@moonbeam-network/xcm-types';

import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import { evmToAddress } from '@polkadot/util-crypto';
import { type Abi, type Address, encodeFunctionData, maxUint64 } from 'viem';
import { ContractBuilder, ContractConfig } from '../../../../../contract';
import {
  getGlobalConsensusDestination,
  getPrecompileDestinationInterior,
} from '../../../../../contract/ContractBuilder.utils';
import {
  type MrlConfigBuilder,
  Provider,
  type Transact,
} from '../../../../MrlBuilder.interfaces';
import {
  buildSendExtrinsic,
  CROSS_CHAIN_FEE,
} from '../../extrinsic/polkadotXcm/polkadotXcm';
import { getAbisForChain } from './abi/abi.helpers';

const module = 'Batch';

export function Batch() {
  const provider = Provider.Wormhole;

  return {
    /**
     * Transfers assets and XCM message using XTokens contract for multi-currency transfer.
     * Uses parents: 1 for multilocation derivation.
     */
    transferAssetsAndMessageViaXtokens: (): MrlConfigBuilder => ({
      provider,
      build: (params) => {
        const { source, sourceAddress, sourceApi } = params;

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
        const { address20: computedOriginAccount } =
          getMultilocationDerivedAddresses({
            address: subMappedAddress,
            paraId: source.parachainId,
            parents: 1,
          });

        const encodedXcmMessage = buildXcmMessage({
          asset: params.asset,
          destination: params.destination,
          destinationAddress: params.destinationAddress,
          computedOriginAccount,
          fee: params.fee,
          isAutomatic: params.isAutomatic,
          moonAsset: params.moonAsset,
          bridgeChain: params.bridgeChain,
          moonApi: params.moonApi,
          source,
          sourceAddress,
          sourceApi: sourceApi,
          transact: params.transact,
        });

        // XTokens-specific: Build transfer using XTokens contract
        const { BatchAbi, XcmUtilsAbi, XtokensAbi } = getAbisForChain(source);
        const { destinationParachainAndAddress } = getDestinationInHex(
          params.bridgeChain,
          computedOriginAccount,
        );

        const { currencies, feeItem } = getCurrencies({
          source,
          moonAsset: params.moonAsset,
          asset: params.asset,
        });

        const multiTransferTxData = encodeFunctionData({
          abi: XtokensAbi,
          functionName: 'transferMultiCurrencies',
          args: [
            currencies,
            feeItem,
            destinationParachainAndAddress,
            maxUint64,
          ],
        });

        const xcmSendTxData = buildXcmSendTxData({
          abi: XcmUtilsAbi,
          destination: getDestinationInHex(
            params.bridgeChain,
            computedOriginAccount,
          ).destinationParachain,
          encodedXcmMessage,
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
    transferAssetsAndMessageViaXcmPrecompile: (): MrlConfigBuilder => ({
      provider,
      build: (params) => {
        const { source, sourceAddress, sourceApi } = params;

        if (!EvmParachain.is(source)) {
          throw new Error('Source chain needs to be an EVMParachain');
        }

        if (!sourceApi) {
          throw new Error('Source API needs to be defined');
        }

        if (!params.bridgeChainFee) {
          throw new Error('Bridge chain fee is required');
        }

        if (
          !source.contracts?.XcmUtils ||
          !source.contracts?.Batch ||
          !source.contracts?.XcmPrecompile
        ) {
          throw new Error(
            'Source chain needs to have the XcmUtils, Batch and XcmPrecompile contract addresses configured',
          );
        }

        const { address20: computedOriginAccount } =
          getMultilocationDerivedAddresses({
            address: sourceAddress,
            paraId: source.parachainId,
            parents: 2, // this function is only used for global consensus currently
          });
        console.log('computedOriginAccount', computedOriginAccount);

        const encodedXcmMessage = buildXcmMessage({
          asset: params.asset,
          destination: params.destination,
          destinationAddress: params.destinationAddress,
          computedOriginAccount,
          fee: params.fee,
          isAutomatic: params.isAutomatic,
          moonAsset: params.moonAsset,
          bridgeChain: params.bridgeChain,
          moonApi: params.moonApi,
          source,
          sourceAddress,
          sourceApi: sourceApi,
          transact: params.transact,
        });

        const { BatchAbi, XcmUtilsAbi } = getAbisForChain(source);

        const transferAssetsCall = ContractBuilder()
          .XcmPrecompile()
          .transferAssetsLocation()
          .foreignErc20()
          .build({
            sourceApi,
            asset: params.asset,
            fee: params.bridgeChainFee,
            destination: params.bridgeChain,
            destinationAddress: computedOriginAccount,
            source,
            sourceAddress,
          });

        const transferAssetsCallData = transferAssetsCall.encodeFunctionData();

        const globalConsensusDestination = getGlobalConsensusDestination(
          sourceApi,
          params.bridgeChain,
        );

        const xcmSendTxData = buildXcmSendTxData({
          abi: XcmUtilsAbi,
          destination: {
            parents: globalConsensusDestination[0],
            interior: globalConsensusDestination[1],
          },
          encodedXcmMessage,
        });

        return new ContractConfig({
          address: source.contracts.Batch,
          abi: BatchAbi,
          args: [
            [source.contracts.XcmPrecompile, source.contracts.XcmUtils],
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

/**
 * Builds the XCM message for cross-chain communication
 */
function buildXcmMessage(params: {
  asset: AssetAmount;
  destination: AnyChain;
  destinationAddress: string;
  computedOriginAccount: string;
  fee: AssetAmount;
  isAutomatic: boolean;
  moonAsset: ChainAsset;
  bridgeChain: AnyParachain;
  moonApi: ApiPromise;
  source: AnyParachain;
  sourceAddress: string;
  sourceApi: ApiPromise;
  transact: Transact | undefined;
}): string {
  const send = buildSendExtrinsic(params);
  return send.args[1].toHex();
}

/**
 * Builds the xcmSend transaction data
 */
function buildXcmSendTxData(params: {
  abi: Abi;
  destination: unknown;
  encodedXcmMessage: string;
}): string {
  return encodeFunctionData({
    abi: params.abi,
    functionName: 'xcmSend',
    args: [params.destination, params.encodedXcmMessage],
  });
}

function getDestinationInHex(
  bridgeChain: AnyParachain,
  computedOriginAccount: string,
) {
  const destinationParachain = {
    parents: 1,
    interior: getPrecompileDestinationInterior(bridgeChain),
  } as const;

  const destinationParachainAndAddress = {
    parents: 1,
    interior: getPrecompileDestinationInterior(
      bridgeChain,
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
