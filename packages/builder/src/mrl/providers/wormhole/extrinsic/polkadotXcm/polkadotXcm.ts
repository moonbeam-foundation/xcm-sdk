import {
  type AnyParachain,
  AssetAmount,
  Parachain,
} from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import type { ISubmittableResult } from '@polkadot/types/types';

import { ExtrinsicBuilder } from '../../../../../extrinsic/ExtrinsicBuilder';
import {
  getExtrinsicArgumentVersion,
  normalizeConcrete,
  normalizeX1,
} from '../../../../../extrinsic/ExtrinsicBuilder.utils';
import { getGlobalConsensus } from '../../../../../extrinsic/pallets/polkadotXcm/polkadotXcm.util';
import { ExtrinsicConfig } from '../../../../../types/substrate/ExtrinsicConfig';
import {
  type MrlBuilderParams,
  type MrlConfigBuilder,
  Provider,
} from '../../../../MrlBuilder.interfaces';

// TODO: these have to come from the configs
const BUY_EXECUTION_FEE = 100_000_000_000_000_000n; // bridgeChainFee
export const CROSS_CHAIN_FEE = 100_000_000_000_000_000n; // fee for processing the xcm message in moon chain

export function polkadotXcm() {
  const provider = Provider.Wormhole;

  return {
    send: (
      transferAssetsPallet?: 'polkadotXcm' | 'xTokens',
    ): MrlConfigBuilder => ({
      provider,
      build: ({
        asset,
        destination,
        destinationAddress,
        fee,
        isAutomatic,
        moonAsset,
        bridgeChain,
        moonApi,
        sendOnlyRemoteExecution,
        source,
        sourceAddress,
        sourceApi,
        transact,
      }) => {
        if (!destination.wh?.name) {
          throw new Error('Destination chain does not have a wormhole name');
        }

        if (!sourceApi) {
          throw new Error('Source API needs to be defined');
        }

        if (!Parachain.is(source)) {
          throw new Error('Source chain needs to be a parachain');
        }

        console.log('sourceAddress', sourceAddress);

        const { address20: computedOriginAccount } =
          getMultilocationDerivedAddresses({
            address: sourceAddress,
            paraId: source.parachainId,
            parents: 1,
          });

        console.log('computedOriginAccount', computedOriginAccount);

        const assetTransferTxs = getAssetTransferTxs({
          transferAssetsPallet,
          asset,
          computedOriginAccount,
          destination,
          destinationAddress,
          fee,
          isAutomatic,
          moonApi,
          moonAsset,
          bridgeChain,
          source,
          sourceAddress,
          sourceApi,
        });

        const send = buildSendExtrinsic({
          asset,
          destination,
          destinationAddress,
          computedOriginAccount,
          fee,
          isAutomatic,
          moonAsset,
          bridgeChain,
          moonApi,
          source,
          sourceAddress,
          sourceApi,
          transact,
        });

        const transactionsToSend = sendOnlyRemoteExecution
          ? [send]
          : [...assetTransferTxs, send];

        return new ExtrinsicConfig({
          module: 'utility',
          func: 'batchAll',
          getArgs: () => [transactionsToSend],
        });
      },
    }),
  };
}

interface HelperFunctionParams extends MrlBuilderParams {
  computedOriginAccount: string;
  source: AnyParachain;
  sourceApi: ApiPromise;
}

function getDestinationMultilocation(
  source: AnyParachain,
  bridgeChain: AnyParachain,
) {
  const isDifferentEcosystem = source.ecosystem !== bridgeChain.ecosystem;

  if (isDifferentEcosystem) {
    return {
      parents: 2,
      interior: {
        X2: [
          { GlobalConsensus: getGlobalConsensus(bridgeChain) },
          { Parachain: bridgeChain.parachainId },
        ],
      },
    };
  }
  return {
    parents: 1,
    interior: {
      X1: { Parachain: bridgeChain.parachainId },
    },
  };
}

export function buildSendExtrinsic({
  source,
  computedOriginAccount,
  moonAsset,
  bridgeChain,
  sourceApi,
  transact,
}: HelperFunctionParams) {
  if (!transact) {
    throw new Error('Transact params are required');
  }

  const version = getExtrinsicArgumentVersion(sourceApi.tx.polkadotXcm.send);

  console.log('transact', transact);

  return sourceApi.tx.polkadotXcm.send(
    {
      [version]: normalizeX1(
        version,
        getDestinationMultilocation(source, bridgeChain),
      ),
    },
    {
      [version]: [
        {
          WithdrawAsset: [
            {
              id: normalizeConcrete(
                version,
                normalizeX1(version, {
                  parents: 0,
                  interior: {
                    X1: {
                      PalletInstance: moonAsset.getAssetPalletInstance(),
                    },
                  },
                }),
              ),
              fun: { Fungible: BUY_EXECUTION_FEE },
            },
          ],
        },
        {
          BuyExecution: {
            fees: {
              id: normalizeConcrete(
                version,
                normalizeX1(version, {
                  parents: 0,
                  interior: {
                    X1: {
                      PalletInstance: moonAsset.getAssetPalletInstance(),
                    },
                  },
                }),
              ),
              fun: { Fungible: BUY_EXECUTION_FEE },
            },
            weightLimit: 'Unlimited',
          },
        },
        {
          Transact: {
            originKind: 'SovereignAccount',
            requireWeightAtMost: {
              refTime: transact.txWeight.refTime,
              proofSize: transact.txWeight.proofSize,
            },
            call: {
              encoded: transact.call,
            },
          },
        },
        {
          SetAppendix: [
            { RefundSurplus: {} },
            {
              DepositAsset: {
                assets: { Wild: { AllCounted: 1 } },
                beneficiary: normalizeX1(version, {
                  parents: 0,
                  interior: {
                    X1: {
                      AccountKey20: { key: computedOriginAccount },
                    },
                  },
                }),
              },
            },
          ],
        },
      ],
    },
  );
}

interface GetAssetTransferTxsParams extends HelperFunctionParams {
  transferAssetsPallet?: 'polkadotXcm' | 'xTokens';
}

function getAssetTransferTxs({
  transferAssetsPallet = 'xTokens',
  ...params
}: GetAssetTransferTxsParams): SubmittableExtrinsic<
  'promise',
  ISubmittableResult
>[] {
  console.log('transferAssetsPallet', transferAssetsPallet);
  if (transferAssetsPallet === 'xTokens') {
    return getAssetTransferTxsFromXtokens(params);
  }
  if (transferAssetsPallet === 'polkadotXcm') {
    return getAssetTransferTxsForPolkadotXcm(params);
  }
  throw new Error(
    'Invalid transferAssetsPallet for polkadotXcm().send() function',
  );
}

export function getAssetTransferTxsForPolkadotXcm({
  asset,
  computedOriginAccount,
  moonApi,
  moonAsset,
  bridgeChain,
  source,
  sourceAddress,
  sourceApi,
}: HelperFunctionParams): SubmittableExtrinsic<
  'promise',
  ISubmittableResult
>[] {
  const { transferAssets } = sourceApi.tx.polkadotXcm;
  const polkadotXcmBuilder = ExtrinsicBuilder()
    .polkadotXcm()
    .transferAssetsToEcosystem()
    .X4();

  const transferAssetsTx = transferAssets(
    ...polkadotXcmBuilder
      .build({
        asset,
        destination: bridgeChain,
        destinationAddress: computedOriginAccount,
        destinationApi: moonApi,
        fee: AssetAmount.fromChainAsset(source.getChainAsset(moonAsset), {
          amount: CROSS_CHAIN_FEE + BUY_EXECUTION_FEE,
        }),
        source: source,
        sourceAddress,
        sourceApi,
      })
      .getArgs(transferAssets),
  );

  return [transferAssetsTx];
}

function getAssetTransferTxsFromXtokens({
  asset,
  computedOriginAccount,
  fee,
  moonApi,
  moonAsset,
  bridgeChain,
  source,
  sourceAddress,
  sourceApi,
}: HelperFunctionParams): SubmittableExtrinsic<
  'promise',
  ISubmittableResult
>[] {
  const transferBuilder = ExtrinsicBuilder().xTokens().transfer();
  const transferMulticurrenciesBuilder = ExtrinsicBuilder()
    .xTokens()
    .transferMultiCurrencies();

  const { transfer, transferMulticurrencies } = sourceApi.tx.xTokens;
  /**
   * TODO here we should compare the asset with the cross chain fee asset.
   * For example, FTM cannot pay for fees in Moonbase while AGNG can, so for FTM we have to send a transferMulticurrencies
   * This "if" is a workaround, change when we implement properly the concept of cross-chain fee (different from bridgeChainFee)
   */
  if (asset.isSame(fee)) {
    const assetTransferTx = transfer(
      ...transferBuilder
        .build({
          asset: asset.copyWith({
            // TODO for the moment this is only applicable to peaq, AGNG pays for fees and we have to include the cross chain fee
            // for this we have to add a new concept in the config (Cross Chain Fee), and get the value from there
            amount: asset.amount + 10n * CROSS_CHAIN_FEE,
          }),
          destination: bridgeChain,
          destinationAddress: computedOriginAccount,
          destinationApi: moonApi,
          fee,
          source: source,
          sourceAddress,
          sourceApi,
        })
        .getArgs(transfer),
    );
    const feeAssetTransferTx = transfer(
      ...transferBuilder
        .build({
          asset: AssetAmount.fromChainAsset(source.getChainAsset(moonAsset), {
            amount: CROSS_CHAIN_FEE + BUY_EXECUTION_FEE,
          }),
          destination: bridgeChain,
          destinationAddress: computedOriginAccount,
          destinationApi: moonApi,
          fee,
          source: source,
          sourceAddress,
          sourceApi,
        })
        .getArgs(transfer),
    );
    return [assetTransferTx, feeAssetTransferTx];
  }
  const multiCurrenciesTransferTx = transferMulticurrencies(
    ...transferMulticurrenciesBuilder
      .build({
        asset,
        destination: bridgeChain,
        destinationAddress: computedOriginAccount,
        destinationApi: moonApi,
        fee: AssetAmount.fromChainAsset(source.getChainAsset(moonAsset), {
          amount: CROSS_CHAIN_FEE + BUY_EXECUTION_FEE,
        }),
        source: source as AnyParachain,
        sourceAddress,
        sourceApi,
      })
      .getArgs(transferMulticurrencies),
  );
  return [multiCurrenciesTransferTx];
}
