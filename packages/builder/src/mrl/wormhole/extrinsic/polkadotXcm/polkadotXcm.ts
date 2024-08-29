import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import {
  AnyParachain,
  AssetAmount,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import { ExtrinsicBuilder } from '../../../../extrinsic/ExtrinsicBuilder';
import { ExtrinsicConfig } from '../../../../types/substrate/ExtrinsicConfig';
import { MrlConfigBuilder } from '../../../MrlBuilder.interfaces';

// TODO: Can we move them somewhere?
const BUY_EXECUTION_FEE = 100_000_000_000_000_000n;
const CROSS_CHAIN_FEE = 100_000_000_000_000_000n;
export const BATCH_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000808';

export function polkadotXcm() {
  return {
    send: (): MrlConfigBuilder => ({
      build: ({
        asset,
        destination,
        destinationAddress,
        destinationApi,
        fee,
        moonAsset,
        moonChain,
        source,
        sourceAddress,
        sourceApi,
        transact,
      }) => {
        if (!destination.wh?.name) {
          throw new Error('Destination chain does not have a wormhole name');
        }

        if (!Parachain.is(destination) && !EvmParachain.is(destination)) {
          throw new Error(
            `Destination ${destination.name} is not a Parachain or EvmParachain`,
          );
        }

        if (!transact) {
          throw new Error('Transact params are required');
        }

        const { transfer } = sourceApi.tx.xTokens;
        const builder = ExtrinsicBuilder().xTokens().transfer();

        const assetTransferTx = transfer(
          builder
            .build({
              asset,
              destination,
              destinationAddress,
              destinationApi,
              fee,
              // TODO: This is a workaround. xTokens.transfer doesn't need source chain but the interfaces requires it.
              // In this case we know that a source chain is not a Parachain.
              source: source as AnyParachain,
              sourceAddress,
              sourceApi,
            })
            .getArgs(transfer),
        );
        /*
         * TODO: Can we move it to AssetRoute and receive it in build params?
         * In the future we could also check if wallet already has necessary DEV/GLMR to pay execution fees on Moonbase/Moonbeam.
         * Also we need to move fees to AssetRoute.
         */
        const feeAssetTransferTx = transfer(
          builder
            .build({
              asset: AssetAmount.fromChainAsset(moonAsset, {
                amount: CROSS_CHAIN_FEE + BUY_EXECUTION_FEE,
              }),
              destination,
              destinationAddress,
              destinationApi,
              fee,
              source: source as AnyParachain,
              sourceAddress,
              sourceApi,
            })
            .getArgs(transfer),
        );

        const { address20 } = getMultilocationDerivedAddresses({
          address: destinationAddress,
          paraId: moonChain.parachainId,
          isParents: true,
        });

        const send = sourceApi.tx.polkadotXcm.send(
          {
            V3: {
              parents: 1,
              interior: { X1: { Parachain: moonChain.parachainId } },
            },
          },
          {
            V3: [
              {
                WithdrawAsset: [
                  {
                    id: {
                      Concrete: {
                        parents: 0,
                        interior: {
                          X1: {
                            PalletInstance: moonAsset.getAssetPalletInstance(),
                          },
                        },
                      },
                    },
                    fun: { Fungible: BUY_EXECUTION_FEE },
                  },
                ],
              },
              {
                BuyExecution: {
                  fees: {
                    id: {
                      Concrete: {
                        parents: 0,
                        interior: {
                          X1: {
                            PalletInstance: moonAsset.getAssetPalletInstance(),
                          },
                        },
                      },
                    },
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
                      beneficiary: {
                        parents: 0,
                        interior: {
                          X1: { AccountKey20: { key: address20 } },
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
        );

        return new ExtrinsicConfig({
          module: 'utility',
          func: 'batchAll',
          getArgs: () => [assetTransferTx, feeAssetTransferTx, send],
        });
      },
    }),
  };
}
