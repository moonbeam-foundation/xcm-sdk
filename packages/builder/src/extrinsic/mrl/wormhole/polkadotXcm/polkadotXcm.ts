import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { ExtrinsicBuilder } from '../../../ExtrinsicBuilder';
import { MrlExtrinsicConfigBuilder } from '../../../ExtrinsicBuilder.interfaces';
import { ExtrinsicConfig } from '../../../ExtrinsicConfig';

// TODO: Can we move them somewhere?
const BUY_EXECUTION_FEE = 100_000_000_000_000_000n;
const CROSS_CHAIN_FEE = 100_000_000_000_000_000n;
export const BATCH_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000808';

export function polkadotXcm() {
  return {
    send: (): MrlExtrinsicConfigBuilder => ({
      build: (params) => {
        const {
          destination,
          destinationAddress,
          moonAsset,
          moonChain,
          sourceApi,
          transact,
        } = params;

        if (!destination.wh?.name) {
          throw new Error('Destination chain does not have a wormhole name');
        }

        if (!transact) {
          throw new Error('Transact params are required');
        }

        const { transfer } = sourceApi.tx.xTokens;
        const builder = ExtrinsicBuilder().xTokens().transfer();

        const assetTx = transfer(builder.build(params).getArgs(transfer));
        /*
         * TODO: Can we move it to AssetRoute and receive it in build params?
         * In the future we could also check if wallet already has necessary DEV/GLMR to pay execution fees on Moonbase/Moonbeam.
         * Also we need to move fees to AssetRoute.
         */
        const executionAssetTx = transfer(
          builder
            .build({
              ...params,
              asset: AssetAmount.fromChainAsset(moonAsset, {
                amount: CROSS_CHAIN_FEE + BUY_EXECUTION_FEE,
              }),
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
          getArgs: () => [assetTx, executionAssetTx, send],
        });
      },
    }),
  };
}
