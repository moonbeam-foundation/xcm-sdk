import {
  convertAddressTo32Bytes,
  getMultilocationDerivedAddresses,
} from '@moonbeam-network/xcm-utils';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { Address, encodeFunctionData } from 'viem';
import { Chain, Wormhole } from '@wormhole-foundation/sdk-connect';
import { EvmPlatform } from '@wormhole-foundation/sdk-evm';
import { ExtrinsicBuilder } from '../../../ExtrinsicBuilder';
import { MrlExtrinsicConfigBuilder } from '../../../ExtrinsicBuilder.interfaces';
import { ExtrinsicConfig } from '../../../ExtrinsicConfig';
import { BATCH_CONTRACT_ABI } from './BatchContractAbi';
import { ERC20_ABI } from './Erc20ABI';
import { TOKEN_BRIDGE_ABI } from './TokenBridgeAbi';
import { TOKEN_BRIDGE_RELAYER_ABI } from './TokenBrigdeRelayerAbi';

// TODO: Can we move them somewhere?
const BUY_EXECUTION_FEE = 100_000_000_000_000_000n;
const CROSS_CHAIN_FEE = 100_000_000_000_000_000n;
export const BATCH_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000808';

export function xTokens() {
  return {
    transfer: ({
      isAutomatic,
    }: {
      isAutomatic: boolean;
    }): MrlExtrinsicConfigBuilder => ({
      build: (params) => {
        const {
          asset,
          destination,
          destinationAddress,
          moonApi,
          moonAsset,
          moonChain,
          moonGasLimit,
          sourceApi,
        } = params;

        if (!destination.wh?.name) {
          throw new Error('Destination chain does not have a wormhole name');
        }

        const { transfer } = sourceApi.tx.xTokens;
        const builder = ExtrinsicBuilder().xTokens().transfer();

        const assetTx = transfer(builder.build(params).getArgs(transfer));
        /*
         * TODO: We need to move it to AssetRoute and receive it in build params.
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

        const wh = new Wormhole(moonChain.isTestChain ? 'Testnet' : 'Mainnet', [
          EvmPlatform,
        ]);
        const whDestinationChain = wh.getChain(destination.wh.name).config
          .chainId;
        const whContractAddress = (
          isAutomatic
            ? wh.getChain('Moonbeam').config.contracts.tokenBridgeRelayer
            : wh.getChain('Moonbeam').config.contracts.tokenBridge
        ) as Address;

        const tokenAddressOnMoonChain = moonChain.getChainAsset(asset)
          .address as Address;
        const tokenAmountOnMoonChain = asset.convertDecimals(
          moonChain.getChainAsset(asset).decimals,
        ).amount;

        const approveTx = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [whContractAddress, tokenAmountOnMoonChain],
        });
        const transferTx = isAutomatic
          ? encodeFunctionData({
              abi: TOKEN_BRIDGE_RELAYER_ABI,
              functionName: 'transferTokensWithRelay',
              args: [
                tokenAddressOnMoonChain,
                tokenAmountOnMoonChain,
                0,
                whDestinationChain,
                destinationAddress,
                0,
              ],
            })
          : encodeFunctionData({
              abi: TOKEN_BRIDGE_ABI,
              functionName: 'transferTokens',
              args: [
                tokenAddressOnMoonChain,
                tokenAmountOnMoonChain,
                whDestinationChain,
                convertAddressTo32Bytes(destinationAddress) as Address,
                0n,
                0,
              ],
            });
        const batchAll = encodeFunctionData({
          abi: BATCH_CONTRACT_ABI,
          functionName: 'batchAll',
          args: [
            [tokenAddressOnMoonChain, whContractAddress],
            [0n, 0n], // Value to send for each call
            [approveTx, transferTx], // Call data for each call
            [], // Gas limit for each call
          ],
        });

        const { address20 } = getMultilocationDerivedAddresses({
          address: destinationAddress,
          paraId: moonChain.parachainId,
          isParents: true,
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

        const txWeight = (await transact.paymentInfo(address20)).weight;

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
          getArgs: () => [assetTx, executionAssetTx, send],
        });
      },
    }),
  };
}
