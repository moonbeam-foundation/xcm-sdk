import { moonbaseAlpha, moonbeam } from '@moonbeam-network/xcm-config';
import { AnyParachain, EvmParachain } from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { createPublicClient, http } from 'viem';

const MOON_CHAIN_AUTOMATIC_GAS_ESTIMATION = {
  [moonbeam.key]: 328613n,
  [moonbaseAlpha.key]: 1271922n,
};

export interface GetMoonGasLimitParams {
  isAutomatic: boolean;
  moonChain: EvmParachain;
  source: AnyParachain;
  sourceAddress: string;
}

export async function getMoonGasLimit({
  isAutomatic,
  moonChain,
  source,
  sourceAddress,
}: GetMoonGasLimitParams): Promise<bigint> {
  const client = createPublicClient({
    chain: moonChain.getViemChain(),
    transport: http(),
  });
  const { address20 } = getMultilocationDerivedAddresses({
    address: sourceAddress,
    paraId: source.parachainId,
    isParents: true,
  });

  // TODO: we have a problem to calculate the gasEstimation for automatic:
  // it requires the computedOriginAccount to have the balance for the call
  // which we don't have when we make the call. We hardcode it for now
  const gasEstimation = isAutomatic
    ? MOON_CHAIN_AUTOMATIC_GAS_ESTIMATION[moonChain.key]
    : await client.estimateGas({
        account: address20,
        to: BATCH_CONTRACT_ADDRESS,
        data: emptyBatchAll,
      });

  return (gasEstimation * 110n) / 100n;
}
