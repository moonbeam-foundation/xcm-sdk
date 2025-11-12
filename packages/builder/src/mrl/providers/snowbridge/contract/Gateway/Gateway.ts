import {
  type AnyChain,
  type AssetAmount,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';
import { SnowbridgeConfig } from '../../snowbridge';

export function Gateway() {
  return {
    sendToken: (): MrlConfigBuilder => ({
      build: ({ asset, destinationAddress, bridgeFee, destination }) =>
        callSendToken(asset, bridgeFee, destination, destinationAddress),
    }),
    approveAndSendToken: (): MrlConfigBuilder => ({
      build: ({ asset, destinationAddress, bridgeFee, destination }) => {
        const requiresApproval = bridgeFee && !bridgeFee.isSame(asset);

        return callSendToken(
          asset,
          bridgeFee,
          destination,
          destinationAddress,
          requiresApproval,
        );
      },
    }),
  };
}

function callSendToken(
  asset: AssetAmount,
  bridgeFee: AssetAmount | undefined,
  destination: AnyChain,
  destinationAddress: string,
  requiresApproval = false,
): SnowbridgeConfig {
  if (!bridgeFee) {
    throw new Error('Bridge fee is required for Gateway module');
  }

  if (!EvmParachain.isAnyParachain(destination)) {
    throw new Error(
      'Destination must be a Parachain or EvmParachain for sending token with Gateway module',
    );
  }

  return new SnowbridgeConfig({
    args: {
      tokenAddress: asset.address as string,
      destinationAddress,
      destinationParaId: destination.parachainId,
      amount: asset.amount,
      bridgeFeeAmount: bridgeFee.amount,
      requiresApproval,
    },
    func: 'sendToken',
  });
}
