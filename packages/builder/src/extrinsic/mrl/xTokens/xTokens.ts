import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { ExtrinsicBuilder } from '../../ExtrinsicBuilder';
import { MrlExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';

// TODO: Can we move them somewhere?
const BUY_EXECUTION_FEE = 100_000_000_000_000_000n;
const CROSS_CHAIN_FEE = 100_000_000_000_000_000n;
export const BATCH_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000808';

export function xTokens() {
  return {
    transfer: (): MrlExtrinsicConfigBuilder => ({
      build: (params) => {
        const {
          destinationAddress,
          moonApi,
          moonAsset,
          moonChain,
          moonGasLimit,
          sourceApi,
        } = params;
        const { transfer } = sourceApi.tx.xTokens;
        const builder = ExtrinsicBuilder().xTokens().transfer();

        const asset = transfer(builder.build(params).getArgs(transfer));
        /*
         * TODO: We need to move it to AssetRoute and receive it in build params.
         * In the future we could also check if wallet already has necessary DEV/GLMR to pay execution fees on Moonbase/Moonbeam.
         * Also we need to move fees to AssetRoute.
         */
        const executionAsset = transfer(
          builder
            .build({
              ...params,
              asset: AssetAmount.fromChainAsset(moonAsset, {
                amount: CROSS_CHAIN_FEE + BUY_EXECUTION_FEE,
              }),
            })
            .getArgs(transfer),
        );

        const batchAll = encodeFunctionData({
          abi: BatchContractABI,
          functionName: 'batchAll',
          args: [
            [tokenAddress, bridgeContractAddress], // Addresses to call
            [0n, 0n], // Value to send for each call
            [approveTx, transferTx], // Call data for each call
            [], // Gas limit for each call
          ],
        });

        const transact = moonApi.tx.ethereumXcm.transact({
          V2: {
            gasLimit: moonGasLimit,
            action: {
              Call: BATCH_CONTRACT_ADDRESS,
            },
            value: 0,
            input: batchAll,
          },
        });

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
                    refTime: txWeight.refTime,
                    proofSize: txWeight.proofSize,
                  },
                  call: {
                    encoded: transact.method.toHex(),
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
          getArgs: () => [asset, executionAsset, send],
        });
      },
    }),
  };
}
